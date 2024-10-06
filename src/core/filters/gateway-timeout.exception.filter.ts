import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { GatewayTimeoutException, IHttpGatewayTimeOutExceptionResponse } from 'src/core/exceptions';

/**
 * @class GatewayTimeOutExceptionFilter
 * @implements {ExceptionFilter}
 * @description Exception filter to handle GatewayTimeoutException and format the response.
 */
@Catch(GatewayTimeoutException)
export class GatewayTimeOutExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GatewayTimeoutException.name);

  /**
   * @constructor
   * @param {HttpAdapterHost} httpAdapterHost - The HTTP adapter host.
   */
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /**
   * @method catch
   * @description Handles the GatewayTimeoutException and sends a formatted response.
   * @param {GatewayTimeoutException} exception - The caught exception.
   * @param {ArgumentsHost} host - The arguments host.
   * @returns {void}
   */
  catch(exception: GatewayTimeoutException, host: ArgumentsHost): void {
    this.logger.debug('exception');

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const httpStatus = exception.getStatus();
    const traceId = request.headers.get('x-request-id') || '';
    exception.setTraceId(traceId);
    exception.setPath(httpAdapter.getRequestUrl(ctx.getRequest()));

    const responseBody: IHttpGatewayTimeOutExceptionResponse = exception.generateHttpResponseBody();

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
