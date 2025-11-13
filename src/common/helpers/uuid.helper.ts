import { UUID } from '../types';

export async function createUuid() {
  const { v4: uuidv4 } = await import('uuid');
  return uuidv4() as UUID;
}