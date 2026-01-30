import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { JobStatus } from 'src/common/constants';

export class SimulationProgressEventDto {
 @IsUUID()
  job_id: string;

  @IsEnum(JobStatus, {
    message: 'Invalid job status received from Redis',
  })
  status: JobStatus;

  @IsNumber()
  progress: number;

  @IsOptional()
  @IsString()
  url?: string;

}
