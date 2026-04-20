import { CellKey, EmptyRegions, MineFieldRecord } from 'src/core/game'

export interface BoardSlice {
  cells: MineFieldRecord
  randomMineCellKeys: CellKey[]
  emptyRegions: EmptyRegions
  revealedSafeCells: number
  totalNonMineCells: number

  revealCell: (cellKey: CellKey) => void
  revealMultipleCells: (cellKeys: CellKey[]) => void
  revealEmptyRegion: (regionId: number) => void
  explodeMine: (cellKey: CellKey) => void
  toggleFlagCell: (cellKey: CellKey) => void
  hasWon: () => boolean
}
