import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UnauthorizedException } from 'src/core/exceptions';

import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('authUser') {
  constructor(private reflector: Reflector) {
    super();
  }

  JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError';

  TOKEN_EXPIRED_ERROR = 'TokenExpiredError';

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: Error, context: any, status: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (info?.name === this.JSON_WEB_TOKEN_ERROR) {
      throw UnauthorizedException.JSON_WEB_TOKEN_ERROR();
    } else if (info?.name === this.TOKEN_EXPIRED_ERROR) {
      throw UnauthorizedException.TOKEN_EXPIRED_ERROR();
    } else if (info) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS(info.message);
    } else if (err) {
      throw err;
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
