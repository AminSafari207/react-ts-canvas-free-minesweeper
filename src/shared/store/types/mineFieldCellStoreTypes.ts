import { CellKey, MineFieldRecord } from 'src/core/game'

export interface MineFieldCellStore {
  cells: MineFieldRecord
  randomMineCellKeys: CellKey[]
  totalRevealedSafeCells: number

  updateAllCells: (newCells: MineFieldRecord) => void
  updateRandomMineCellKeys: (cellKeys: CellKey[]) => void
  revealCell: (cellKey: CellKey) => void
  revealMultipleCells: (cellKeys: CellKey[]) => void
  explodeMine: (cellKey: CellKey) => void
  toggleFlagCell: (cellKey: CellKey) => void
  resetTotalRevealedSafeCells: () => void
}
