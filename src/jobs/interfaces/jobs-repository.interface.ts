import { Job, JobEvent } from "generated/prisma/client";
import { UpdateJobDto, CreateJobEventDto } from "../dto";
import { CreateJobDto } from "../dto/create-job.dto";

export interface JobsRepositoryInterface {
  findById(id: string): Promise<Job | null>;
  createJob(data: CreateJobDto): Promise<Job>;
  updateJob(id: string, data: UpdateJobDto): Promise<Job>;
  createJobEvent(data: CreateJobEventDto): Promise<JobEvent>;
}