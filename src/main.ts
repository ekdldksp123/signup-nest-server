import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpStatus, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';
import { SharedModule } from './shared/shared.module';
import { ConfigShared } from './shared/services/config.shared';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  setupSeverEnvironment(app);
  setupValidationPipe(app);
  setupInterceptor(app);
  setupSwagger(app);
  handleUnexpectedError();
  await startServer(app);
}

const setupSeverEnvironment = (app: NestExpressApplication) => {
  app.setGlobalPrefix('api');
  //프록시 이용했을때
  app.enable('trust proxy');

  //http 해더 보안취약점 보호
  app.use(helmet());
  
  //CORS 활성화
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use(passport.initialize());
  app.use(cookieParser());
};

const setupValidationPipe = (app: NestExpressApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      // dismissDefaultMessages: true,
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(errors, 'ValidationError');
      },
    })
  );
};

const handleUnexpectedError = () => {
  process
    .on('unhandledRejection', (reason: Error) => {
      console.error(`[Unhandled Rejection at Promise]! ${reason.name} : ${reason.message}`, reason.stack);
    })
    .on('uncaughtException', (error: Error) => {
      console.error(`[uncaughtException]!$ ${error.name} : ${error.message}`, error.stack);
    });
};

const setupInterceptor = (app: NestExpressApplication) => {
  app.useGlobalInterceptors(new LoggingInterceptor());
};

const startServer = async (app: NestExpressApplication) => {
  const config = app.select(SharedModule).get(ConfigShared);

  await app.listen(config.APP.PORT);
  if (process.send) {
    console.info('[Process Ready] to pm2');
    process.send('ready');
  }
};

bootstrap();
