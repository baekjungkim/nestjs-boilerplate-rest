import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { BaseAPIDocumentation } from './api/base.document';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsUris = process.env.CORS_URI;
  /** CORS */
  app.enableCors({
    origin: corsUris.replace(' ', '').split(','),
    credentials: true,
  });
  /**  app Prefix */
  app.setGlobalPrefix('/api');
  /** URI Versioning */
  app.enableVersioning({
    type: VersioningType.URI,
  });
  /** Validation Pipes */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  /** Success Return Interceptor */
  app.useGlobalInterceptors(new SuccessInterceptor());
  /** Http Exception Filter */
  app.useGlobalFilters(new HttpExceptionFilter());

  /** Swagger Login */
  app.use(
    ['/api/docs', '/api/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.API_USER]: process.env.API_PASSWORD,
      },
    }),
  );

  /* mount Swagger API Documentation */
  const documentOptions = new BaseAPIDocumentation().initializeOptions();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
    customSiteTitle: 'api docs',
  });

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
