import { CellKey, MineFieldRecord } from './types'

export type GeneratedMineFieldRecord = {
  mineField: MineFieldRecord
  randomMineCellKeys: CellKey[]
}
