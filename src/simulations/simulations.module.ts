import { Module } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { SimulationsController } from './simulations.controller';
import { RabbitModule } from 'src/transports/rabbitmq/rabbit.module';
import { RedisModule } from 'src/transports/redis/redis.module';
import { RedisService } from 'src/transports/redis/redis.service';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports:[RabbitModule, RedisModule, JobsModule],
  controllers: [SimulationsController],
  providers: [SimulationsService, RedisService],
})
export class SimulationsModule {}
