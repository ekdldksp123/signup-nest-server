import { AuthModule } from 'src/auth/auth.module';
import { ExceptionsFilter } from './common/filters/exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/db-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : process.env.NODE_ENV === 'test'
          ? '.env.test'
          : null,
      isGlobal: true,
    }),
    DatabaseModule,
    SharedModule,
    // UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
