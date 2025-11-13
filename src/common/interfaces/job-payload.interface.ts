import { JobStatus } from "../constants";

export interface JobPayload {
  status: JobStatus;
  progress: number;
  tank_id: number;
  created_at: string;
  updated_at: string;
}
