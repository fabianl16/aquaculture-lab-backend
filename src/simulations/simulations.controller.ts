import { Controller, Inject, Logger } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { envs } from 'src/config';

@Controller()
export class SimulationsController {
  private readonly logger = new Logger(SimulationsController.name);
  
  constructor(
    @Inject(envs.rabbitmqService)
    private readonly rabbitClient: ClientProxy,
    private readonly simulationsService: SimulationsService
  ) {}
  @EventPattern(envs.rabbitmqGatewayQueue)
  async handleSimulationRequest(
    @Payload() simulation: any
  ){  
    
    this.logger.log(`📩 Sending simulation payload...`);

    this.rabbitClient.emit(envs.rabbitmqSimulationsQueue, simulation);
    
    this.logger.log(`📩 Succesful`);


  }
}
