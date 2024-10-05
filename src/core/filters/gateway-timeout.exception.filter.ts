import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { GatewayTimeoutException, IHttpGatewayTimeOutExceptionResponse } from 'src/core/exceptions';

@Catch(GatewayTimeoutException)
export class GatewayTimeOutExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GatewayTimeoutException.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

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
