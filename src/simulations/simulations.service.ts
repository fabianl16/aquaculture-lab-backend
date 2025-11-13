import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import Redis from 'ioredis';
import { envs } from 'src/config';
import { SimulationPayloadDto } from './dto';
import { UUID } from '../common/types';
import { createUuid } from 'src/common/helpers';
import { JobStatus } from 'src/common/constants';
import { RedisService } from 'src/transports/redis/redis.service';

@Injectable()
export class SimulationsService {

    constructor(
        @Inject(envs.rabbitmqService)
        private readonly rabbitClient: ClientProxy,
        private readonly redisService: RedisService
    ){}

    async start_simulation(simulationPayload: SimulationPayloadDto){
        const jobUuid: UUID = await createUuid();
        
        await this.redisService.registerJob(
            jobUuid,
            {
               status: JobStatus.SENDING_TO_START,
               progress: 0,
               tank_id: simulationPayload.tank_id,
               created_at: new Date().toISOString(),
               updated_at: new Date().toISOString()
            }
        )

        await this.redisService.updateJob(
            jobUuid,
            {
                status: JobStatus.QUEUED,
            }
        )
        this.rabbitClient.emit(envs.rabbitmqSimulationsQueue, {
            job_id: jobUuid, 
            ...simulationPayload,
        });

        return { message: 'Simulacion enviada', jobUuid };
    }


}
