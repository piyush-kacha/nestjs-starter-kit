import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UnauthorizedException } from 'src/core/exceptions';

import { JwtUserPayload } from '../interfaces';
import { UserQueryService } from '../../user/user.query.service';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'authUser') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userQueryService: UserQueryService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('authentication.jwtPublicKey'),
      ignoreExpiration: false,
    });
  }

  // validate method is called by passport-jwt when it has verified the token signature
  async validate(payload: JwtUserPayload) {
    const user = await this.userQueryService.findById(payload.user);
    if (!user) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS();
    }
    if (!user.verified) {
      throw UnauthorizedException.USER_NOT_VERIFIED();
    }
    if (payload.code !== user.registerCode) {
      throw UnauthorizedException.REQUIRED_RE_AUTHENTICATION();
    }
    delete user.password; // remove password from the user object
    return user;
  }
}
