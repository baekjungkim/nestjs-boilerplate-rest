import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = <string | IExceptionError>exception.getResponse();

    const errorJson: IErrorJson = {
      ok: false,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (typeof error === 'string') {
      errorJson.statusCode = response.statusCode;
      errorJson.error = error;
    } else {
      errorJson.statusCode = error.statusCode;
      errorJson.error = error.error;
      errorJson.message = error.message;
    }

    response.status(status).json(errorJson);
  }
}

interface IExceptionError {
  error: string;
  statusCode: number;
  message: string | string[];
}

interface IErrorJson {
  ok: boolean;
  timestamp: string;
  path: string;
  statusCode?: number;
  error?: string;
  message?: string | string[];
}
