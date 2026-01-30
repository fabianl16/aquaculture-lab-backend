import { Injectable } from "@nestjs/common";
import { JobsRepositoryInterface } from "./interfaces/jobs-repository.interface";
import { Job, JobEvent } from "generated/prisma/client";
import { UpdateJobDto, CreateJobEventDto } from "./dto";
import { CreateJobDto } from "./dto/create-job.dto";
import { PrismaService } from "src/prisma/prisma.service";



@Injectable()
export class JobsRepository implements JobsRepositoryInterface{

    constructor(
        private readonly prisma: PrismaService
    ){}

    async findById(id: string): Promise<Job | null> {
        return this.prisma.job.findUnique({ where: { id } });
    }
    async createJob(data: CreateJobDto): Promise<Job> {
        return this.prisma.job.create({ data });
    }
    async updateJob(id: string, data: UpdateJobDto): Promise<Job> {
            return this.prisma.job.update({
                where: { id },
                data,
            });
    }
    async createJobEvent(data: CreateJobEventDto): Promise<JobEvent> {
        return this.prisma.jobEvent.create({ 
            data
         });
    }

}