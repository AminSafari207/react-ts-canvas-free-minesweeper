export type UseChunkedMountOptions = {
  totalItems: number
  chunkSize?: number
  enabled?: boolean
}

export type UseChunkedMountReturn = {
  mountedCount: number
  isFullyMounted: boolean
}
