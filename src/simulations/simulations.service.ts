import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { envs } from 'src/config';
import { SimulationPayloadDto } from './dto';
import { UUID } from '../common/types';
import { createUuid } from 'src/common/helpers';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class SimulationsService {

    constructor(
        @Inject(envs.rabbitmqService)
        private readonly rabbitClient: ClientProxy,
        private readonly jobsService: JobsService
    ){}

    async start_simulation(simulationPayload: SimulationPayloadDto){
        const jobUuid: UUID = await createUuid();

        await this.jobsService.bootstrapJob(
            jobUuid,
            simulationPayload.tank_id,
            simulationPayload.preset
        );

        this.rabbitClient.emit(envs.rabbitmqSimulationsQueue, {
            job_id: jobUuid, 
            ...simulationPayload,
        });

        return { message: 'Simulacion enviada', jobUuid };
    }


}
