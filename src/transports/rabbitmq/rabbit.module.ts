import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: envs.rabbitmqService,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitmqUrl],
          queue: envs.rabbitmqSimulationsQueue, 
          queueOptions: { durable: true },
        },
      },
    ]),
    RabbitModule,
    RedisModule
  ],
  exports:[ClientsModule]
})
export class RabbitModule {}
