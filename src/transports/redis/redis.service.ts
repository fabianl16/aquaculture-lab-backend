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

    async registerJob(job_id: UUID, jobPayload: JobPayload):Promise<void>{
        await this.redisClient.hset(job_id, jobPayload);
    }

    async updateJob(job_id: UUID, updates: Partial<JobPayload>):Promise<void>{
        const jobExists = await this.redisClient.exists(job_id);

        if(!jobExists){
            this.logger.warn(`Job ${job_id} not found`);
            return;
        }

        await this.redisClient.hset(job_id, {
            ...updates,
            updated_at: new Date().toISOString(),
        });

        this.logger.debug(`Job ${job_id} updated`);
    }

    async subscribe(channel: string, callback: (msg: string) => void) {
        const subscriber = this.redisClient.duplicate();
        await subscriber.subscribe(channel);
        subscriber.on('message', (_, message) => callback(message));
    }
}
