import { createRequestId, WorkerId, WorkerRequestId } from 'src/workers'
import { WorkerRegistry } from 'src/workers/workerRegistry'
import { create } from 'zustand'
import { ManagedWorker, PendingRequest, WorkerPostOptions, WorkerStore } from './types/workerStoreTypes'

let workerGenerationCounter = 0

export const useWorkerStore = create<WorkerStore>((set, get) => ({
  workers: {},
  pendingRequests: new Map(),
  workerRequests: new Map(),

  spawnWorker: (workerId: WorkerId) => {
    const existing = get().workers[workerId]

    if (existing && existing.status !== 'terminated') {
      console.warn(`Worker ${workerId} already running`)
      return
    }

    const factory = WorkerRegistry[workerId]

    if (!factory) {
      throw new Error(`No worker factory registered for ${workerId}`)
    }

    const worker = factory()
    const generation = ++workerGenerationCounter

    const managedWorker: ManagedWorker = {
      id: workerId,
      worker,
      generation,
      status: 'idle',
      createdAt: Date.now(),
    }

    worker.onmessage = (
      event: MessageEvent<{
        requestId: WorkerRequestId
        payload?: unknown
        error?: string
      }>
    ) => {
      const message = event.data

      if (!message?.requestId) return

      const pending = get().pendingRequests.get(message.requestId)

      if (!pending) return

      if (pending.workerGeneration !== generation) return

      if (pending.timeoutId) {
        clearTimeout(pending.timeoutId)
      }

      get().pendingRequests.delete(message.requestId)

      const set = get().workerRequests.get(workerId)
      set?.delete(message.requestId)

      if (set && set.size === 0) {
        get().workerRequests.delete(workerId)
      }

      if (message.error) {
        pending.reject(new Error(message.error))
      } else {
        pending.resolve(message.payload)
      }
    }

    worker.onerror = (err) => {
      console.error(`Worker ${workerId} crashed`, err)

      const { pendingRequests, workerRequests } = get()

      const requests = workerRequests.get(workerId) ?? new Set()

      for (const requestId of requests) {
        const pending = pendingRequests.get(requestId)

        if (!pending) continue

        if (pending.timeoutId) {
          clearTimeout(pending.timeoutId)
        }

        pending.reject(err)

        pendingRequests.delete(requestId)
      }

      workerRequests.set(workerId, new Set())

      worker.terminate()

      set((s) => ({
        workers: {
          ...s.workers,
          [workerId]: {
            ...managedWorker,
            status: 'terminated',
          },
        },
      }))

      queueMicrotask(() => {
        try {
          get().spawnWorker(workerId)
          console.info(`Worker ${workerId} respawned`)
        } catch (e) {
          console.error(`Failed to respawn ${workerId}`, e)
        }
      })
    }

    worker.onmessageerror = (err) => {
      console.error(`Worker ${workerId} message error`, err)
    }

    console.log(`Worker '${workerId}' has been successfully spawned.`)

    set((s) => ({
      workers: {
        ...s.workers,
        [workerId]: managedWorker,
      },
    }))
  },

  respawnWorker: (workerId: WorkerId) => {
    const { terminateWorker, spawnWorker } = get()

    terminateWorker(workerId)
    spawnWorker(workerId)
  },

  terminateWorker: (workerId: WorkerId) => {
    const worker = get().workers[workerId]
    if (!worker) return

    worker.worker.terminate()

    const requests = get().workerRequests.get(workerId) ?? new Set()

    for (const requestId of requests) {
      const pending = get().pendingRequests.get(requestId)
      if (!pending) continue

      pending.reject(new Error(`Worker ${workerId} terminated`))
      get().pendingRequests.delete(requestId)
    }

    get().workerRequests.set(workerId, new Set())

    set((state) => ({
      workers: {
        ...state.workers,
        [workerId]: {
          ...worker,
          status: 'terminated',
        },
      },
    }))
  },

  terminateAll: () => {
    const workers = get().workers

    for (const id in workers) {
      get().terminateWorker(id as WorkerId)
    }
  },

  post: <TRequest, TResponse>(workerId: WorkerId, message: TRequest, options?: WorkerPostOptions) => {
    const workerEntry = get().workers[workerId]

    if (!workerEntry || workerEntry.status === 'terminated') {
      return Promise.reject(new Error(`Worker ${workerId} not running`))
    }

    const requestId = createRequestId()

    const msg = {
      requestId,
      payload: message,
    }

    return new Promise<TResponse>((resolve, reject) => {
      const pending: PendingRequest<TResponse> = {
        requestId,
        workerId,
        workerGeneration: workerEntry.generation,
        createdAt: Date.now(),
        resolve: resolve as PendingRequest['resolve'],
        reject,
      }

      if (options?.timeoutMs) {
        pending.timeoutId = window.setTimeout(() => {
          get().pendingRequests.delete(requestId)

          reject(new Error(`Worker request timeout (${workerId}, ${options.timeoutMs}ms)`))
        }, options.timeoutMs)
      }

      get().pendingRequests.set(requestId, pending as PendingRequest<unknown>)

      let workerSet = get().workerRequests.get(workerId)

      if (!workerSet) {
        workerSet = new Set()
        get().workerRequests.set(workerId, workerSet)
      }

      workerSet.add(requestId)
      workerEntry.worker.postMessage(msg)
    })
  },

  cancel: (requestId: WorkerRequestId, reason?: string) => {
    const pending = get().pendingRequests.get(requestId)

    if (!pending) return

    if (pending.timeoutId) {
      clearTimeout(pending.timeoutId)
    }

    pending.reject(new Error(reason ?? 'Request cancelled'))

    get().pendingRequests.delete(requestId)
    get().workerRequests.get(pending.workerId)?.delete(requestId)
  },

  cancelLatest: (workerId: WorkerId, reason?: string) => {
    const set = get().workerRequests.get(workerId)

    if (!set || set.size === 0) return

    let latest: WorkerRequestId | undefined

    for (const id of set) {
      latest = id
    }

    if (latest) {
      get().cancel(latest, reason ?? 'Latest request cancelled')
    }
  },

  cancelAll: (workerId: WorkerId, reason?: string) => {
    const set = get().workerRequests.get(workerId)

    if (!set) return

    for (const id of [...set]) {
      get().cancel(id, reason ?? 'Worker requests cancelled')
    }
  },
}))
