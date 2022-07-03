import { LoggerShared } from '@shared/logger.shared';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { REQUEST_TYPE } from '@common/enum/type.enum';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private logger: LoggerShared) {
    this.logger.setContext('ExceptionsFilter');
  }

  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      this.logger.error(`[HTTP_EXCEPTION_ERROR] ${exception.message}`, exception.stack);
      this.sendResponse(host, exception.getStatus(), exception);
    } else {
      this.logger.error(`[INTERNAL_SERVER_ERROR] ${exception.message}`, exception.stack);
      if (typeof exception === 'object') {
        console.dir(exception);
      }

      this.sendResponse(host, HttpStatus.INTERNAL_SERVER_ERROR, exception);
    }
  }

  sendResponse(host: ArgumentsHost, httpStatusCode: HttpStatus, error: Error, sendLog = false) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (process.env.NODE_ENV === 'production') {
      if (!sendLog) error.message = '';
      this.logger.fileLog(request, REQUEST_TYPE.RESPONSE, error);
    }
    response
      .status(httpStatusCode)
      .json({ status: httpStatusCode, message: `${error.message} ${error.stack}`, name: error.name });
  }
}
