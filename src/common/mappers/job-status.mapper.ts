import { JobStatus } from "../constants";

import { JobStatus as JobStatusDB} from "generated/prisma/enums";


export function mapJobStatusToDb(status: JobStatus): JobStatusDB{
    const map: Record<JobStatus, JobStatusDB> = {
        [JobStatus.QUEUED]: JobStatusDB.QUEUED,
        [JobStatus.SENDING_TO_START]: JobStatusDB.SENDING_TO_START,
        [JobStatus.START_SIMULATION]: JobStatusDB.START_SIMULATION,

        [JobStatus.VALIDATING]: JobStatusDB.VALIDATING,
        [JobStatus.RUNNING]: JobStatusDB.RUNNING,
        [JobStatus.GENERATING_FILES]: JobStatusDB.GENERATING_FILES,

        [JobStatus.PREPARING_UPLOAD]: JobStatusDB.PREPARING_UPLOAD,
        [JobStatus.QUEUED_FOR_UPLOAD]: JobStatusDB.QUEUED_FOR_UPLOAD,
        [JobStatus.UPLOADING]: JobStatusDB.UPLOADING,
        [JobStatus.VALIDATING_UPLOAD]: JobStatusDB.VALIDATING_UPLOAD,
        [JobStatus.UPLOAD_RETRYING]: JobStatusDB.UPLOAD_RETRYING,
        [JobStatus.UPLOAD_FAILED]: JobStatusDB.UPLOAD_FAILED,
        [JobStatus.UPLOAD_COMPLETED]: JobStatusDB.UPLOAD_COMPLETED,

        [JobStatus.RETRY_WAITING]: JobStatusDB.RETRY_WAITING,
        [JobStatus.RETRYING]: JobStatusDB.RETRYING,

        [JobStatus.COMPLETED]: JobStatusDB.COMPLETED,
        [JobStatus.ERROR]: JobStatusDB.ERROR,
        [JobStatus.TIMEOUT]: JobStatusDB.TIMEOUT,
        [JobStatus.CANCELLED]: JobStatusDB.CANCELLED,
        [JobStatus.FAILED_PERMANENTLY]: JobStatusDB.FAILED_PERMANENTLY,
    };

  return map[status];
}


export function mapJobStatusFromDb(status: JobStatusDB): JobStatus {
  const map: Record<JobStatusDB, JobStatus> = {
    [JobStatusDB.QUEUED]: JobStatus.QUEUED,
    [JobStatusDB.SENDING_TO_START]: JobStatus.SENDING_TO_START,
    [JobStatusDB.START_SIMULATION]: JobStatus.START_SIMULATION,

    [JobStatusDB.VALIDATING]: JobStatus.VALIDATING,
    [JobStatusDB.RUNNING]: JobStatus.RUNNING,
    [JobStatusDB.GENERATING_FILES]: JobStatus.GENERATING_FILES,

    [JobStatusDB.PREPARING_UPLOAD]: JobStatus.PREPARING_UPLOAD,
    [JobStatusDB.QUEUED_FOR_UPLOAD]: JobStatus.QUEUED_FOR_UPLOAD,
    [JobStatusDB.UPLOADING]: JobStatus.UPLOADING,
    [JobStatusDB.VALIDATING_UPLOAD]: JobStatus.VALIDATING_UPLOAD,
    [JobStatusDB.UPLOAD_RETRYING]: JobStatus.UPLOAD_RETRYING,
    [JobStatusDB.UPLOAD_FAILED]: JobStatus.UPLOAD_FAILED,
    [JobStatusDB.UPLOAD_COMPLETED]: JobStatus.UPLOAD_COMPLETED,

    [JobStatusDB.RETRY_WAITING]: JobStatus.RETRY_WAITING,
    [JobStatusDB.RETRYING]: JobStatus.RETRYING,

    [JobStatusDB.COMPLETED]: JobStatus.COMPLETED,
    [JobStatusDB.ERROR]: JobStatus.ERROR,
    [JobStatusDB.TIMEOUT]: JobStatus.TIMEOUT,
    [JobStatusDB.CANCELLED]: JobStatus.CANCELLED,
    [JobStatusDB.FAILED_PERMANENTLY]: JobStatus.FAILED_PERMANENTLY,
  };

  return map[status];
}