# <p align="center">Pinple Backend</p>

<p align="center">A Pinple backend is NestJS + MongoDB</p>

**Framework [NestJS](https://docs.nestjs.kr/)**

**Database [MongoDB](https://docs.mongodb.com/manual/core/document/)**

## Description

[Pinple](https://pinple.com) homepage.

## Clone

```bash
$ git clone -b dev --single-branch https://github.com/thegraphicnovels/pinple-backend
```

## Setting

```javascript
# .env 세팅
PORT=8000
MODE=dev
MONGODB_URI=mongodb+srv://<username>:<password>@<mongodb_uri>/<dbname>
```

## Running the app

```bash
# development
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
