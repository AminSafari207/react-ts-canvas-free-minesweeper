import { EmptyRegions } from './injectEmptyCellRegionsTypes'
import { CellKey, MineFieldRecord } from './types'

export type GeneratedMineFieldRecord = {
  mineField: MineFieldRecord
  randomMineCellKeys: CellKey[]
  emptyRegions: EmptyRegions
}
