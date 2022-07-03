import { Global, Module } from '@nestjs/common';
import { ConfigShared } from '@shared/config.shared';
import { LoggerShared } from '@shared/logger.shared';

//전역에서 공유되는 서비스들을 묶어놓은 모듈
const providers = [ConfigShared, LoggerShared];
@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
