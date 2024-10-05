import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { ExceptionConstants, GatewayTimeoutException } from 'src/core/exceptions';

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
