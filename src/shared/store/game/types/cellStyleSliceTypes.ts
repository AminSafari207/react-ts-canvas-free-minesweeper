import { Theme } from '@mui/material'
import { CSSProperties } from 'react'

export type MinefieldCellStyles = {
  concealed: CSSProperties
  exploded: CSSProperties
  mine: CSSProperties
  mineCounters: Record<string, unknown>[]
  empty: CSSProperties
}

export interface CellStyleSlice {
  cellStyles: MinefieldCellStyles

  renewCellStyles: (theme: Theme) => void
}
