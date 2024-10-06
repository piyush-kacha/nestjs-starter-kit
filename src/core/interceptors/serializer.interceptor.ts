import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { deepResolvePromisesUtil } from 'src/utils';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  /**
   * Intercepts the request and serializes the response data by resolving any promises.
   *
   * @param {ExecutionContext} context - The execution context of the request.
   * @param {CallHandler} next - The next handler in the request pipeline.
   * @returns {Observable<unknown>} An observable of the serialized response data.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((data) => deepResolvePromisesUtil(data)));
  }
}
