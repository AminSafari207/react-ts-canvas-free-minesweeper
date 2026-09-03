import { generateMinefield } from 'src/core/game'
import { WorkerRequestEnvelope, WorkerResponseEnvelope } from 'src/shared/store'
import { GenerateMinefieldResponse, MinefieldMessageType, MinefieldRequest } from './protocol/minefield/minefield.protocol'

type MinefieldMessageEventEnvelope = MessageEvent<WorkerRequestEnvelope<MinefieldRequest>>

const handleGenerate = (event: MinefieldMessageEventEnvelope) => {
  const { requestId, payload } = event.data

  try {
    const generatedMinefield = generateMinefield(payload.totalRows, payload.totalColumns, payload.totalMines)

    const envelope: WorkerResponseEnvelope<GenerateMinefieldResponse> = {
      requestId,
      payload: generatedMinefield,
    }

    self.postMessage(envelope)
  } catch (error) {
    const envelope: WorkerResponseEnvelope = {
      requestId,
      error: error instanceof Error ? error.message : 'Unkown worker error',
    }

    self.postMessage(envelope)
  }
}

const handlers = {
  [MinefieldMessageType.GENERATE]: handleGenerate,
}

self.onmessage = (event: MinefieldMessageEventEnvelope) => {
  const { payload } = event.data

  handlers[payload.type](event)
}
