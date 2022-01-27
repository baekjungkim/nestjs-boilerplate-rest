import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocumentation {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('PINPLE API DOCS')
      .setVersion('1.0')
      .setContact('Pinple', 'https://pinple.com', 'pinple@pinple.com')
      .build();
  }
}
