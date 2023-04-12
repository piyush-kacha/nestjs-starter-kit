import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { BadRequestException } from '../exceptions/bad-request.exception';

/**
 * A filter to handle `BadRequestException`.
 */
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BadRequestException.name);

  /**
   * Constructs a new instance of `BadRequestExceptionFilter`.
   * @param httpAdapterHost - The HttpAdapterHost instance to be used.
   */
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /**
   * Handles the `BadRequestException` and transforms it into a JSON response.
   * @param exception - The `BadRequestException` instance that was thrown.
   * @param host - The `ArgumentsHost` instance that represents the current execution context.
   */
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    // Logs the exception details at the verbose level.
    this.logger.verbose(exception);

    // In certain situations `httpAdapter` might not be available in the constructor method,
    // thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    // Retrieves the current HTTP context from the `ArgumentsHost`.
    const ctx = host.switchToHttp();

    // Retrieves the HTTP status code from the `BadRequestException`.
    const httpStatus = exception.getStatus();

    // Retrieves the request object from the HTTP context.
    const request = ctx.getRequest();

    // Sets the trace ID from the request object to the exception.
    exception.setTraceId(request.id);

    // Constructs the response body object.
    const responseBody = exception.generateHttpResponseBody();

    // Uses the HTTP adapter to send the response with the constructed response body
    // and the HTTP status code.
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
