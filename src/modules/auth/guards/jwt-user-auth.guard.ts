import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

import { UnauthorizedException } from '../../../exceptions/unauthorized.exception';

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('authUser') {
  JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError';

  TOKEN_EXPIRED_ERROR = 'TokenExpiredError';

  canActivate(context: ExecutionContext) {
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
