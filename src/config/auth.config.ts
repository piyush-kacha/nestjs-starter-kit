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

/**
 * Registers the authentication configuration using the `registerAs` function.
 *
 * This configuration includes:
 * - `bcryptSaltRounds`: The number of salt rounds to use for bcrypt hashing, parsed from the environment variable `BCRYPT_SALT_ROUNDS`.
 * - `jwtPrivateKey`: The private key for JWT, decoded from base64 and converted to a UTF-8 string from the environment variable `JWT_PRIVATE_KEY`.
 * - `jwtPublicKey`: The public key for JWT, decoded from base64 and converted to a UTF-8 string from the environment variable `JWT_PUBLIC_KEY`.
 * - `jwtExpiresIn`: The expiration time for JWT tokens, taken from the environment variable `JWT_EXPIRATION_TIME` or defaulting to '1h'.
 *
 * Before returning the configuration, it validates the environment variables using `validateConfigUtil` and `EnvironmentVariablesValidator`.
 *
 * @returns {AuthenticationConfig} The authentication configuration object.
 */
export default registerAs<AuthenticationConfig>('authentication', (): AuthenticationConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);
  return {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
    jwtPrivateKey: Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64').toString('utf-8'),
    jwtPublicKey: Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString('utf-8'),
    jwtExpiresIn: process.env.JWT_EXPIRATION_TIME || '1h',
  };
});
