import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ResponseDto } from 'src/shared';

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T> {
  /**
   * Intercept the request and add the timestamp
   * @param context {ExecutionContext}
   * @param next {CallHandler}
   * @returns { payload:Response<T>, timestamp: string }
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto<T>> {
    const timestamp = new Date().toISOString();
    return next.handle().pipe(
      map((payload) => {
        return { payload, timestamp };
      }),
    );
  }
}
