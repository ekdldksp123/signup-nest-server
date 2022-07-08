# signup-nest-server

## Install

```bash
$ yarn
```

## env 파일 세팅

```bash
# .env.development 파일 생성
# -> 상황에 따라 아래 환경변수 수정하기
JWT_SECRET_ACCESS='JWT_SECRET_ACCESS'
JWT_SECRET_REFRESH='JWT_SECRET_REFRESH'
JWT_ACCESS_TOKEN_EXPIRE_DATE=10m
JWT_REFRESH_TOKEN_EXPIRE_DATE=1days
JWT_ISS='http://dev.localhost.com/'
PORT=3001

MONGO_USER='root'
MONGO_PASSWORD='test'
MONGO_PORT=27017

```

## 시작

```bash
# development (*) 이걸로 실행!
$ docker compose up dev

# production
$ docker compose up prod
```
