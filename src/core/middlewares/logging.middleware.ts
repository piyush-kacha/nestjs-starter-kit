import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

import { randomUUID } from 'node:crypto';

/**
 * Middleware that logs incoming HTTP requests and their responses.
 *
 * This middleware assigns a unique request ID to each incoming request if it doesn't already have one.
 * It logs a warning message if the response status code is between 400 and 500.
 *
 * @example
 * // In your module file
 * import { RequestLoggerMiddleware } from './middlewares/logging.middleware';
 *
 * @Injectable()
 * export class AppModule {
 *   configure(consumer: MiddlewareConsumer) {
 *     consumer
 *       .apply(RequestLoggerMiddleware)
 *       .forRoutes('*');
 *   }
 * }
 *
 * @implements {NestMiddleware}
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    req.headers['x-request-id'] = req.headers['x-request-id'] || randomUUID();
    const traceId = req.headers['x-request-id'];
    res.on('finish', () => {
      const { statusCode } = res;
      if (statusCode >= 400 && statusCode <= 500) {
        this.logger.warn(`[${traceId}}] [${req.method}] ${req.url} - ${statusCode}`);
      }
    });
    next();
  }
}
