import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger, NotFoundException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * Catches all exceptions thrown by the application and sends an appropriate HTTP response.
 */
@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  /**
   * @private
   * @readonly
   * @type {${1:*}}
   */
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
  catch(exception: NotFoundException, host: ArgumentsHost): void {
    // Log the exception.

    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const instanceException: NotFoundException = exception instanceof NotFoundException ? exception : new NotFoundException(exception);

    const httpStatus = exception instanceof NotFoundException ? exception.getStatus() : HttpStatus.NOT_FOUND;

    const request = ctx.getRequest();

    // Construct the response body.
    const responseBody: Record<string, unknown> = {
      code: httpStatus,
      message: 'Not Found',
      description: instanceException.message,
      timestamp: new Date().toISOString(),
      traceId: request.id,
    };

    // Send the HTTP response.
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
