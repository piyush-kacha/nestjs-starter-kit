import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, UnprocessableEntityException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { AllException, ExceptionConstants } from '../exceptions';

/**
 * A filter to catch all exceptions and format the response.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /**
   * Method to handle caught exceptions.
   * @param exception - The exception that was thrown.
   * @param host - The arguments host.
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception);

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (exception instanceof UnprocessableEntityException) {
      const unprocessableException = exception as UnprocessableEntityException;
      const httpStatus = unprocessableException.getStatus();
      const response = unprocessableException.getResponse();

      const exc = new AllException({
        code: ExceptionConstants.BadRequestCodes.VALIDATION_ERROR,
        message: unprocessableException.name,
        description: unprocessableException.message,
        cause: unprocessableException,
      });
      exc.setTraceId(ctx.getRequest().id);
      exc.setError(response && response['validationErrors'] ? response['validationErrors'] : response);

      const responseBody = exc.generateHttpResponseBody();

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    } else {
      // Determine the HTTP status code
      const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

      const request = ctx.getRequest();

      // Construct the response body
      const responseBody = {
        error: (exception as any).code || 'INTERNAL_SERVER_ERROR',
        message: (exception as any).message || 'An unexpected error occurred',
        description: (exception as any).description || null,
        timestamp: new Date().toISOString(),
        traceId: request.id || null,
      };

      // Send the response
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
}
