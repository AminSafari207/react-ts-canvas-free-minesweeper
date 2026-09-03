import { CellKey, EmptyRegions, MinefieldRecord } from 'src/core/game'

type MiefieldState = {
  cells: MinefieldRecord
  randomMineCellKeys: CellKey[]
  emptyRegions: EmptyRegions
}

export type BoardSlice = MiefieldState & {
  revealedSafeCells: number
  totalNonMineCells: number
  boardSessionId: number
  queuedMinefield: MiefieldState | null

  revealCell: (cellKey: CellKey) => void
  revealMultipleCells: (cellKeys: CellKey[]) => void
  revealEmptyRegion: (regionId: number) => void
  explodeMine: (cellKey: CellKey) => void
  toggleFlagCell: (cellKey: CellKey) => void
  hasWon: () => boolean
}
