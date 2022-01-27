import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { BaseAPIDocumentation } from './api/base.document';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**  app bootstrap */
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

  /* mount Swagger API Documentation */
  const documentOptions = new BaseAPIDocumentation().initializeOptions();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
    customSiteTitle: 'Pinple api docs',
  });

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
