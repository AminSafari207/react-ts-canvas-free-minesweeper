import { CellCoordinates } from './types/types'

// prettier-ignore
export const NEIGHBOR_OFFSETS = [
  [-1, -1], [-1, 0],  [-1, 1],
  [0, -1],            [0, 1],
  [1, -1],  [1, 0],   [1, 1],
] as const satisfies CellCoordinates[]
