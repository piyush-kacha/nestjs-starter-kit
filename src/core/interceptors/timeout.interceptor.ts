import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { ExceptionConstants, GatewayTimeoutException } from 'src/core/exceptions';

/**
 * TimeoutInterceptor is a NestJS interceptor that applies a timeout to the request handling process.
 * If the request takes longer than the specified time, it throws a GatewayTimeoutException.
 *
 * @class
 * @implements {NestInterceptor}
 *
 * @constructor
 * @param {number} millisec - The timeout duration in milliseconds.
 *
 * @method
 * @name intercept
 * @param {ExecutionContext} context - The execution context of the request.
 * @param {CallHandler} next - The next handler in the request pipeline.
 * @returns {Observable<any>} - An observable that either completes within the specified timeout or throws a GatewayTimeoutException.
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly millisec: number) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.millisec),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          throw new GatewayTimeoutException({
            message: 'Gateway Timeout',
            cause: new Error('Gateway Timeout'),
            code: ExceptionConstants.BadRequestCodes.INVALID_INPUT,
            description: 'Gateway Timeout',
          });
        }
        return throwError(() => err);
      }),
    );
  }
}
