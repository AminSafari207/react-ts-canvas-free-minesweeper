import { useWorkerStore } from 'src/shared/store'
import { GenerateMinefieldRequest, GenerateMinefieldResponse, MinefieldMessageType } from '../protocol/minefield/minefield.protocol'
import { WorkerId } from '../protocol/worker-id'

export const generateMinefieldWorker = (
  totalRows: number,
  totalColumns: number,
  totalMines: number
): Promise<GenerateMinefieldResponse> => {
  const request: GenerateMinefieldRequest = {
    type: MinefieldMessageType.GENERATE,
    totalRows,
    totalColumns,
    totalMines,
  }

  return useWorkerStore
    .getState()
    .post<GenerateMinefieldRequest, GenerateMinefieldResponse>(WorkerId.MINEFIELD, request, { timeoutMs: 5000 })
}

export const cancelAllMinefieldWorkers = () => {
  useWorkerStore.getState().cancelAll(WorkerId.MINEFIELD)
}
