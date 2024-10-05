import { registerAs } from '@nestjs/config';

export interface AuthenticationConfig {
  bcryptSaltRounds: number;
  jwtPrivateKey: string;
  jwtPublicKey: string;
  jwtExpiresIn: string;
}

export default registerAs(
  'authentication',
  (): AuthenticationConfig => ({
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
    jwtPrivateKey: Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64').toString('utf-8'),
    jwtPublicKey: Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString('utf-8'),
    jwtExpiresIn: process.env.JWT_EXPIRATION_TIME || '1h',
  }),
);
