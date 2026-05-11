import { useWorkerStore } from 'src/shared/store'
import { WorkerId } from './protocol/worker-id'

export const bootstrapWorkers = () => {
  const { spawnWorker } = useWorkerStore.getState()

  spawnWorker(WorkerId.MINEFIELD)
}
