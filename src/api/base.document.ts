import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocumentation {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder

      .setTitle('API DOCS')
      .setVersion('1.0')
      .setContact('API', 'https://api.com', 'api@api.com')
      .addBearerAuth(
        {
          description: `Enter without prefix 'Bearer '`,
          name: 'Authorization',
          bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
          scheme: 'Bearer',
          type: 'http', // I`ve attempted type: 'apiKey' too
          in: 'Header',
        },
        'TOKEN', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();
  }
}
