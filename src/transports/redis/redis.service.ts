import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { JobPayload } from 'src/common/interfaces';
import { UUID } from 'src/common/types';
import { envs } from 'src/config';

@Injectable()
export class RedisService {
    private readonly logger = new Logger(RedisService.name);
    constructor(
        @Inject(envs.redisClient)
        private readonly redisClient: Redis
    ){}

    async registerJob(jobId: UUID, jobPayload: JobPayload):Promise<void>{
        await this.redisClient.hset(jobId, jobPayload);
    }

    async updateJob(jobId: UUID, updates: Partial<JobPayload>):Promise<void>{
        const jobExists = await this.redisClient.exists(jobId);

        if(!jobExists){
            this.logger.warn(`Job ${jobId} not found`);
            return;
        }

        await this.redisClient.hset(jobId, {
            ...updates,
            updated_at: new Date().toISOString(),
        });

        this.logger.debug(`Job ${jobId} updated`);
    }
}
