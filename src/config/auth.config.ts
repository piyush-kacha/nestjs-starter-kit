import { registerAs } from '@nestjs/config';

import { IsBase64, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

import { validateConfigUtil } from 'src/utils';

export type AuthenticationConfig = {
  bcryptSaltRounds: number;
  jwtPrivateKey: string;
  jwtPublicKey: string;
  jwtExpiresIn: string;
};

class EnvironmentVariablesValidator {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(10)
  BCRYPT_SALT_ROUNDS: number;

  @IsBase64()
  @IsNotEmpty()
  JWT_PRIVATE_KEY: string;

  @IsBase64()
  @IsNotEmpty()
  JWT_PUBLIC_KEY: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRATION_TIME: string;
}

export default registerAs<AuthenticationConfig>('authentication', (): AuthenticationConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);
  return {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
    jwtPrivateKey: Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64').toString('utf-8'),
    jwtPublicKey: Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString('utf-8'),
    jwtExpiresIn: process.env.JWT_EXPIRATION_TIME || '1h',
  };
});
