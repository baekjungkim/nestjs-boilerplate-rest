import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as Joi from 'joi';
import { CatsModule } from './api/v1/cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './api/v1/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MODE: Joi.string().valid('dev', 'prod', 'test').default('dev'),
        PORT: Joi.number().default(8000),
        CORS_URI: Joi.string().default('http://localhost:3000'),
        JWT_SECRET: Joi.string().required(),
        API_USER: Joi.string().required(),
        API_PASSWORD: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    CatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  // Production 여부
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    // Logger Middleware
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // DB log
    mongoose.set('debug', this.isDev);
  }
}
