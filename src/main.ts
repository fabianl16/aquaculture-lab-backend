import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main-gateway');
  const appPort = envs.nestJsPort;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [envs.rabbitmqUrl],
      queue: envs.rabbitmqGatewayQueue,
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  await app.listen(appPort);

  logger.log(`🚀 Backend Client running on PORT:${appPort}`);
}
bootstrap();
