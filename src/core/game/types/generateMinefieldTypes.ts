import { EmptyRegions } from './injectEmptyCellRegionsTypes'
import { CellKey, MinefieldRecord } from './types'

export type GeneratedMinefieldRecord = {
  minefield: MinefieldRecord
  randomMineCellKeys: CellKey[]
  emptyRegions: EmptyRegions
}
