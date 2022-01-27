# <p align="center">NestJS Boilerplate</p>

## Setting

```javascript
# .env 세팅
PORT=8000
MODE=dev
MONGODB_URI=mongodb+srv://<username>:<password>@<mongodb_uri>/<dbname>
CORS_URI=http://localhost:3000, http://localhost:3001
JWT_SECRET=secret
API_USER=admin
API_PASSWORD=admin
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
