import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { envs } from "src/config";
import { RedisService } from "src/transports/redis/redis.service";
import { JobsService } from "../jobs.service";
import { SimulationProgressEventDto } from "../dto/simulation-progress-event.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class JobsListener implements OnModuleInit{

    private readonly logger = new Logger(JobsListener.name);

    constructor(
        private readonly redisService: RedisService,
        private readonly jobsService: JobsService
    ){}
    async onModuleInit() {
        const channel = envs.redisSimulationChannel;
    
        await this.redisService.subscribe(channel, async (message) => {
            try {
                const raw = JSON.parse(message);
                const data = JSON.parse(raw);
                const payload = plainToInstance(SimulationProgressEventDto, data);
                const errors = await validate(payload);
                if (errors.length > 0) {
                    this.logger.error(
                        `Invalid Redis payload: ${JSON.stringify(errors)}`,
                    );
                    return;
                }

                await this.jobsService.handleJobProgress(payload);
            } catch (error) {
                this.logger.error('Invalid message from Redis', error);
            }
        });
    }

}