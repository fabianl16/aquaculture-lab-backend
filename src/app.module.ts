import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitModule } from './transports/rabbitmq/rabbit.module';
import { SimulationsModule } from './simulations/simulations.module';
import { RedisModule } from './transports/redis/redis.module';

@Module({
  imports: [RabbitModule, SimulationsModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
