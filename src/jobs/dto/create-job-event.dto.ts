import { Prisma } from "generated/prisma/client";
import { JobStatus } from "generated/prisma/enums";


export interface CreateJobEventDto {
  job_id: string;
  status: JobStatus;
  progress?: number;
  rawStatus?: string;
  payload?: Prisma.InputJsonValue;
}