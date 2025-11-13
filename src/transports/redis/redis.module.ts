import { Module, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { envs } from 'src/config';
import { RedisService } from './redis.service';

@Module({
  providers: [
    {
      provide: envs.redisClient,
      useFactory: () => {
        const logger = new Logger('Redis');
        const client = new Redis(envs.redisUrl);
        client.on('connect', () => logger.log('Connected'));
        client.on('error', (err) => logger.error('Error', err));
        return client;
      },
    },
    RedisService,
  ],
  exports: [envs.redisClient, RedisService],
})
export class RedisModule {}
