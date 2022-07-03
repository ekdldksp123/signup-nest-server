import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('회원가입', () => {
    it.todo('[성공]');
    it.todo('[실패] - email regex');
    it.todo('[실패] - id regex');
  });

  describe('로그인', () => {
    it.todo('[성공]');
    it.todo('[실패] - 비밀번호가 일치하지 않습니다.');
  });
});
