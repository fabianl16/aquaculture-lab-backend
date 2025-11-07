import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitModule } from './transports/rabbit.module';
import { SimulationsModule } from './simulations/simulations.module';

@Module({
  imports: [RabbitModule, SimulationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
