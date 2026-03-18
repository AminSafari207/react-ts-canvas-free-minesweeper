import { CellKey, MineFieldRecord } from 'src/core/game'

export interface BoardSlice {
  cells: MineFieldRecord
  randomMineCellKeys: CellKey[]
  revealedSafeCells: number
  totalNonMineCells: number

  revealCell: (cellKey: CellKey) => void
  revealMultipleCells: (cellKeys: CellKey[]) => void
  explodeMine: (cellKey: CellKey) => void
  toggleFlagCell: (cellKey: CellKey) => void
  hasWon: () => boolean
}
