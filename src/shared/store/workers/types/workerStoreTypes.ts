import { WorkerId, WorkerRequestId } from 'src/workers'

export type WorkerRequestEnvelope<TPayload = unknown> = {
  requestId: WorkerRequestId
  payload: TPayload
}

export type WorkerResponseEnvelope<TPayload = unknown> = {
  requestId: WorkerRequestId
  payload?: TPayload
  error?: string
}

export type WorkerOutgoingMessage = unknown
export type WorkerIncomingMessage = unknown

export type WorkerGeneration = number

export type WorkerFactory = () => Worker

export type WorkerFactoryRegistry = Partial<Record<WorkerId, WorkerFactory>>

export type ManagedWorker = {
  id: WorkerId
  worker: Worker
  generation: WorkerGeneration
  status: 'idle' | 'busy' | 'terminated'
  createdAt: number
}

export type PendingRequest<TResponse = WorkerIncomingMessage> = {
  requestId: WorkerRequestId
  workerId: WorkerId
  workerGeneration: WorkerGeneration
  createdAt: number
  timeoutId?: number
  resolve: (value: TResponse) => void
  reject: (reason?: unknown) => void
}

export type RegisterPendingRequestParams<TResponse = WorkerIncomingMessage> = {
  requestId: WorkerRequestId
  workerId: WorkerId
  workerGeneration: WorkerGeneration
  resolve: (value: TResponse) => void
  reject: (reason?: unknown) => void
  timeoutMs?: number
}

export type ResolvePendingRequestParams<TResponse = WorkerIncomingMessage> = {
  requestId: WorkerRequestId
  workerGeneration: WorkerGeneration
  response: TResponse
}

export type RejectPendingRequestParams = {
  requestId: WorkerRequestId
  workerGeneration?: WorkerGeneration
  reason: unknown
}

export type WorkerPostOptions = {
  timeoutMs?: number
}

export type WorkerStore = {
  workers: Partial<Record<WorkerId, ManagedWorker>>
  pendingRequests: Map<WorkerRequestId, PendingRequest>
  workerRequests: Map<WorkerId, Set<WorkerRequestId>>

  spawnWorker: (workerId: WorkerId) => void
  respawnWorker: (workerId: WorkerId) => void
  terminateWorker: (workerId: WorkerId) => void
  terminateAll: () => void

  post: <TRequest extends WorkerOutgoingMessage, TResponse extends WorkerIncomingMessage>(
    worker: WorkerId,
    message: TRequest,
    options?: WorkerPostOptions
  ) => Promise<TResponse>

  cancel: (requestId: WorkerRequestId, reason?: string) => void
  cancelLatest: (workerId: WorkerId, reason?: string) => void
  cancelAll: (workerId: WorkerId, reason?: string) => void
}
