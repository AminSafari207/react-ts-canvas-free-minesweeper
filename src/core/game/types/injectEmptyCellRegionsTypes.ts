import { CellKey } from 'src/core/game'

interface EmptyRegion {
  members: CellKey[]
  borderCounters: CellKey[]
}

export type EmptyRegions = EmptyRegion[]
