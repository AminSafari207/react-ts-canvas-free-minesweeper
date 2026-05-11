type ApplyGameConfigOptions = { totalRows?: number; totalColumns?: number; totalMines?: number }

export interface ConfigSlice {
  totalRows: number
  totalColumns: number
  totalMines: number
  flagLimit: number

  applyGameConfig: ({ totalRows, totalColumns, totalMines }: ApplyGameConfigOptions) => void
}
