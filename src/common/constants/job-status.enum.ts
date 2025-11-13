export enum JobStatus {
  SENDING_TO_START = 'sending-to-start',
  QUEUED = 'queued',
  START_SIMULATION = 'start-simulation',
  RUNNING = 'running',
  CHECKPOINT_125 = 'checkpoint-125',
  CHECKPOINT_250 = 'checkpoint-250',
  CHECKPOINT_375 = 'checkpoint-375',
  FINISH = 'finish',
  ERROR = 'error',
}