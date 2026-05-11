import { WorkerFactoryRegistry } from 'src/shared/store/workers/types/workerStoreTypes'
import { WorkerId } from './protocol/worker-id'

export const WorkerRegistry: WorkerFactoryRegistry = {
  [WorkerId.MINEFIELD]: () => new Worker(new URL('./minefield.worker.ts', import.meta.url), { type: 'module' }),
}
