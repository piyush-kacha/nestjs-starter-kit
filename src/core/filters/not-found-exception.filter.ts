import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { ExceptionConstants, IHttpNotFoundExceptionResponse, NotFoundException } from '../exceptions';

/**
 * Catches all exceptions thrown by the application and sends an appropriate HTTP response.
 */
@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(NotFoundExceptionFilter.name);

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
    this.logger.warn(exception);

    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus = exception.getStatus();

    const request = ctx.getRequest();

    if (exception.code === ExceptionConstants.NotFoundCodes.URL_NOT_FOUND) {
      const path = httpAdapter.getRequestUrl(request);
      // Sets the path from the request object to the exception.
      exception.setPath(path);
      // Log the exception.
      this.logger.warn(`The requested URL was not found: ${path}`);
    }

    // Sets the trace ID from the request object to the exception.
    exception.setTraceId(request.id);

    // Construct the response body.
    const responseBody: IHttpNotFoundExceptionResponse = exception.generateHttpResponseBody();

    // Send the HTTP response.
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
