export type UseChunkedMountOptions = {
  totalItems: number
  chunkSize?: number
}

export type UseChunkedMountReturn = {
  visibleCount: number
  isReadyToMount: boolean
}
