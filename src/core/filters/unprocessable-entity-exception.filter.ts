import { ExceptionFilter, Catch, ArgumentsHost, UnprocessableEntityException, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { Response } from 'express';

import { AllException, ExceptionConstants } from '../exceptions';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnprocessableEntityExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: UnprocessableEntityException, host: ArgumentsHost): void {
    this.logger.error(exception);

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = exception.getStatus();

    const response = ctx.getResponse<Response>();

    const finalException: AllException = new AllException({
      code: ExceptionConstants.BadRequestCodes.VALIDATION_ERROR,
      message: exception.name,
      description: exception.message,
      cause: exception,
    });
    finalException.setTraceId(ctx.getRequest().id);
    finalException.setError(response && response['validationErrors'] ? response['validationErrors'] : response);

    const responseBody = finalException.generateHttpResponseBody();

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
