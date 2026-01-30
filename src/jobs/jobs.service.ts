import { Inject, Injectable } from '@nestjs/common';
import { SimulationProgressEventDto } from './dto/simulation-progress-event.dto';
import { mapJobStatusToDb } from 'src/common/mappers';
import { JobsRepository } from './jobs.repository';
import { JobStatus } from 'src/common/constants';
import { RedisService } from 'src/transports/redis/redis.service';
import { UUID } from 'src/common/types';
import { JobStatus as JobStatusDb } from 'generated/prisma/enums';
import { PresetDto } from 'src/simulations/dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class JobsService {
    private readonly JOB_STATUS_ONLY = new Set<JobStatus>([
        JobStatus.QUEUED,
        JobStatus.SENDING_TO_START,
        JobStatus.START_SIMULATION,
        JobStatus.COMPLETED,
        JobStatus.ERROR,
        JobStatus.TIMEOUT,
        JobStatus.CANCELLED,
        JobStatus.FAILED_PERMANENTLY,
    ]);
    
    private readonly EVENT_STATUSES = new Set<JobStatus>([
        JobStatus.VALIDATING,
        JobStatus.RUNNING,
        JobStatus.GENERATING_FILES,
        JobStatus.PREPARING_UPLOAD,
        JobStatus.QUEUED_FOR_UPLOAD,
        JobStatus.UPLOADING,
        JobStatus.VALIDATING_UPLOAD,
        JobStatus.UPLOAD_RETRYING,
        JobStatus.UPLOAD_FAILED,
        JobStatus.UPLOAD_COMPLETED,
        JobStatus.RETRY_WAITING,
        JobStatus.RETRYING,
    ]);

    private readonly EVENT_ERROR_STATUSES = new Set<JobStatus>([
        JobStatus.UPLOAD_FAILED,
        JobStatus.ERROR,
        JobStatus.TIMEOUT,
    ]);

    constructor(
        private readonly redisService: RedisService,
        private readonly jobsRepository: JobsRepository
    ){}

    async bootstrapJob(job_id: UUID, tankId: string, preset: PresetDto){
        const initialState = {
            status: JobStatus.SENDING_TO_START,
            progress: 0
        };

        await this.createJob(
            {
                job_id,
                ...initialState
            },
            tankId,
            preset
        );

        await this.redisService.registerJob(job_id, {
            ...initialState,
            tank_id: tankId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });

        await this.redisService.updateJob(
            job_id,
            {
                status: JobStatus.QUEUED,
            }
        );
    }

    async handleJobProgress(payload: SimulationProgressEventDto){
        const { job_id, status, progress, url } = payload;
        const dbStatus = mapJobStatusToDb(status);

        if(this.JOB_STATUS_ONLY.has(status)){
            await this.updateJob(
                job_id,
                dbStatus,
                progress,
                url
            );
        }


        if(this.EVENT_STATUSES.has(status)){
            await this.jobsRepository.createJobEvent({
                job_id,
                status: dbStatus,
                progress,
            });
        }

        if (this.EVENT_ERROR_STATUSES.has(status)) {
            await this.updateJob(
                job_id,
                this.mapEventErrorToJobStatus(status),
                progress ?? 100
            );
        }
    }

    async createJob(payload: SimulationProgressEventDto, tankId:string, preset: PresetDto){
        const { status, job_id } = payload;
        const dbStatus = mapJobStatusToDb(status);

        const job = await this.jobsRepository.createJob({
            id: job_id,
            status: dbStatus,
            progress: payload.progress,
            tankId: tankId
        });
         
        const event = await this.jobsRepository.createJobEvent({
            job_id,
            status: dbStatus,
            payload: {
                preset: instanceToPlain(preset),
                tankId
            }
        })

        return job;
    }

    private async updateJob(
        job_id: string,
        status: JobStatusDb,
        progress: number,
        url?: string
    ){
        await this.jobsRepository.updateJob(job_id,
            {
                status,
                progress,
                url
            }
        )
    }

    private mapEventErrorToJobStatus(status: JobStatus): JobStatusDb {
        switch (status) {
            case JobStatus.UPLOAD_FAILED:
                return JobStatusDb.ERROR;
            case JobStatus.TIMEOUT:
                return JobStatusDb.TIMEOUT;
            default:
                return JobStatusDb.ERROR;
        }
    } 

}
