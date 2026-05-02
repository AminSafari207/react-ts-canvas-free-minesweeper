type ApplyGameConfigOptions = { rowCount?: number; colCount?: number; totalMines?: number }

export interface ConfigSlice {
  rowCount: number
  colCount: number
  totalMines: number
  flagLimit: number

  applyGameConfig: ({ rowCount, colCount, totalMines }: ApplyGameConfigOptions) => void
}
