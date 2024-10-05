import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { CoreModule } from './core/core.module';
import {
  AllExceptionsFilter,
  BadRequestExceptionFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter,
  ForbiddenExceptionFilter,
  GatewayTimeOutExceptionFilter,
  ValidationExceptionFilter,
} from './core/filters';
import { TimeoutInterceptor } from './core/interceptors';
import { AuthModule } from './modules/auth/auth.module';
import { JwtUserAuthGuard } from './modules/auth/guards';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';

@Module({
  imports: [
    CoreModule,
    // Import other modules
    AuthModule,
    UserModule,
    WorkspaceModule,
  ],
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
      useFactory: () => {
        // TODO: Move this to config
        const timeoutInMilliseconds = 30000;
        return new TimeoutInterceptor(timeoutInMilliseconds);
      },
    },
    {
      provide: APP_GUARD,
      useClass: JwtUserAuthGuard,
    },
  ],
})
export class AppModule {}
