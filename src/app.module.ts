/**
 * AppModule is the main application module that combines CoreModule and ModulesModule.
 * It provides various filters and interceptors for handling exceptions and requests.
 */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { CoreModule } from './core/core.module';
import {
  AllExceptionsFilter,
  BadRequestExceptionFilter,
  ForbiddenExceptionFilter,
  GatewayTimeOutExceptionFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter,
  ValidationExceptionFilter,
} from './core/filters';
import { TimeoutInterceptor } from './core/interceptors';
import { ModulesModule } from './modules/modules.module';
import { JwtUserAuthGuard } from './modules/auth/guards';

/**
 * The main application module for the NestJS starter kit.
 *
 * @module AppModule
 *
 * @imports
 * - CoreModule: The core module of the application.
 * - ModulesModule: The main modules of the application.
 *
 * @providers
 * - APP_FILTER:
 *   - AllExceptionsFilter: Handles all exceptions.
 *   - BadRequestExceptionFilter: Handles bad request exceptions.
 *   - UnauthorizedExceptionFilter: Handles unauthorized exceptions.
 *   - ForbiddenExceptionFilter: Handles forbidden exceptions.
 *   - NotFoundExceptionFilter: Handles not found exceptions.
 *   - GatewayTimeOutExceptionFilter: Handles gateway timeout exceptions.
 * - APP_PIPE:
 *   - ValidationExceptionFilter: Handles validation exceptions.
 * - APP_INTERCEPTOR:
 *   - TimeoutInterceptor: Intercepts requests and applies a timeout based on configuration.
 * - APP_GUARD:
 *   - JwtUserAuthGuard: Guards routes using JWT authentication.
 *
 * @param {ConfigService} configService - Service to manage application configuration.
 * @returns {TimeoutInterceptor} - Returns a new instance of TimeoutInterceptor with the configured timeout.
 */
@Module({
  imports: [CoreModule, ModulesModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ForbiddenExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: GatewayTimeOutExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: (configService: ConfigService) => {
        const timeoutInMilliseconds = configService.get<number>('infra.requestTimeout', {
          infer: true,
        });
        return new TimeoutInterceptor(timeoutInMilliseconds);
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: JwtUserAuthGuard,
    },
  ],
})
export class AppModule {}
