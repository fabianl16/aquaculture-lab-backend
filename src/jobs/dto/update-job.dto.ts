import { JobStatus } from "generated/prisma/enums";

export interface UpdateJobDto {
  status?: JobStatus;
  progress?: number;
  url?: string | null;
}