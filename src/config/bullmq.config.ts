export interface IBullMQRedisConfig {
  redisHost: string;
  redisPort: number;
  redisUsername: string;
  redisPassword: string;
  isTlsEnabled: boolean;
}

export const bullMqRedisConfig = (): IBullMQRedisConfig => ({
  redisHost: process.env.BULLMQ_REDIS_HOST || 'localhost',
  redisPort: Number(process.env.BULLMQ_REDIS_PORT),
  redisUsername: process.env.BULLMQ_REDIS_USERNAME || '',
  redisPassword: process.env.BULLMQ_REDIS_PASSWORD || '',
  isTlsEnabled: process.env.BULLMQ_REDIS_TLS_ENABLED === 'true',
});
