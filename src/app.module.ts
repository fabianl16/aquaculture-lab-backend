import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitModule } from './transports/rabbitmq/rabbit.module';
import { SimulationsModule } from './simulations/simulations.module';
import { RedisModule } from './transports/redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [RabbitModule, SimulationsModule, RedisModule, PrismaModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
