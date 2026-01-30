import { JobStatus } from "generated/prisma/enums";

export interface CreateJobDto {
  id: string;
  tankId: string;
  status: JobStatus;
  progress: number;
  url?: string;
}