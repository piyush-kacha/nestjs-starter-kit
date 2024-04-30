export interface IJwtConfig {
  privateKey: string;
  publicKey: string;
  expiresIn: string;
}

export const jwtConfig = (): IJwtConfig => ({
  privateKey: Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64').toString('utf-8'),
  publicKey: Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString('utf-8'),
  expiresIn: process.env.JWT_EXPIRATION_TIME || '1h',
});
