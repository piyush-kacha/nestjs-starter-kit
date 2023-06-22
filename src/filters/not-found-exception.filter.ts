import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, NotFoundException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * Catches all exceptions thrown by the application and sends an appropriate HTTP response.
 */
@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(NotFoundExceptionFilter.name);

  /**
   * Creates an instance of `NotFoundExceptionFilter`.
   *
   * @param {HttpAdapterHost} httpAdapterHost - the HTTP adapter host
   */
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /**
   * Catches an exception and sends an appropriate HTTP response.
   *
   * @param {*} exception - the exception to catch
   * @param {ArgumentsHost} host - the arguments host
   * @returns {void}
   */
  catch(exception: any, host: ArgumentsHost): void {
    // Log the exception.

    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const request = ctx.getRequest();

    // Construct the response body.
    const responseBody = {
      error: exception.code,
      message: exception.message,
      description: exception.description,
      traceId: request.id,
    };

    // Send the HTTP response.
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
