import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsRepository } from './jobs.repository';
import { RedisModule } from 'src/transports/redis/redis.module';
import { RedisService } from 'src/transports/redis/redis.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JobsListener } from './listeners/jobs.listener';

@Module({
  imports:[RedisModule, PrismaModule],
  providers: [JobsService, JobsRepository, RedisService, JobsListener],
  exports: [JobsService]
})
export class JobsModule {}
