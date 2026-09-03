import { EmptyRegions } from './injectEmptyCellRegionsTypes'
import { CellKey, MinefieldRecord } from './types'

export type GeneratedMinefieldRecord = {
  cells: MinefieldRecord
  randomMineCellKeys: CellKey[]
  emptyRegions: EmptyRegions
}
