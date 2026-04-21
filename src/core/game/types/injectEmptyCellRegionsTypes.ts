import { CellKey } from 'src/core/game'

export interface EmptyRegion {
  isRevealed: boolean
  members: CellKey[]
  borderCounters: CellKey[]
}

export type EmptyRegions = EmptyRegion[]
