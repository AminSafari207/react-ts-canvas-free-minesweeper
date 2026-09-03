import { CellCoordinates } from 'src/core/game'

export type UseChunkedCellsOptions = {
  totalRows: number
  totalColumns: number
  chunkSize?: number
  enabled?: boolean
}

export type UseChunkedCellsReturn = {
  visibleCells: CellCoordinates[]
  isFullyMounted: boolean
  mountedCount: number
}
