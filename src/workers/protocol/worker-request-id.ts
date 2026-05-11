export type WorkerRequestId = string & { readonly __brand: 'RequestId' }

export const toWorkerRequestId = (value: string): WorkerRequestId => value as WorkerRequestId

export const createRequestId = (): WorkerRequestId =>
  toWorkerRequestId(
    typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  )
