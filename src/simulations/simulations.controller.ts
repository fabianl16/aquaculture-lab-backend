import { Controller, Logger } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { envs } from 'src/config';
import { SimulationPayloadDto } from './dto';

@Controller()
export class SimulationsController {
  private readonly logger = new Logger(SimulationsController.name);
  
  constructor(
    private readonly simulationsService: SimulationsService
  ) {}
  @MessagePattern(envs.rabbitmqGatewayQueue)
  async handleSimulationRequest(
    @Payload() simulationPayload: SimulationPayloadDto
  ){  
    return this.simulationsService.start_simulation(simulationPayload);    
  }
}
