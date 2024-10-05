// Importing the required libraries
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { WorkspaceModule } from '../workspace/workspace.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtUserStrategy } from './strategies';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.get<string>('authentication.jwtPrivateKey', {
          infer: true,
        }),
        publicKey: configService.get<string>('authentication.jwtPublicKey', {
          infer: true,
        }),
        signOptions: { expiresIn: configService.get<string>('authentication.jwtExpiresIn'), algorithm: 'RS256' },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
    }),
    UserModule,
    WorkspaceModule,
  ],
  providers: [ConfigService, JwtUserStrategy, AuthService],
  controllers: [AuthController],
  exports: [JwtUserStrategy, PassportModule],
})
export class AuthModule {}
