export enum JobStatus {
  // --- ESTADOS INICIALES ---
  QUEUED = 'queued',
  SENDING_TO_START = 'sending-to-start',
  START_SIMULATION = 'start-simulation',

  // --- PROCESO DE SIMULACIÓN ---
  VALIDATING = 'validating',
  RUNNING = 'running',
  GENERATING_FILES = 'generating-files',

  // --- ETAPAS PARA SUBIDA A MINIO ---
  PREPARING_UPLOAD = 'preparing-upload',
  QUEUED_FOR_UPLOAD = 'queued-for-upload',
  UPLOADING = 'uploading',
  VALIDATING_UPLOAD = 'validating-upload',
  UPLOAD_RETRYING = 'upload-retrying',
  UPLOAD_FAILED = 'upload-failed',
  UPLOAD_COMPLETED = 'upload-completed',

  // --- RETRIES GENERALES ---
  RETRY_WAITING = 'retry-waiting',
  RETRYING = 'retrying',

  // --- ESTADOS FINALES ---
  COMPLETED = 'completed',
  ERROR = 'error',
  TIMEOUT = 'timeout',
  CANCELLED = 'cancelled',
  FAILED_PERMANENTLY = 'failed-permanently',
}