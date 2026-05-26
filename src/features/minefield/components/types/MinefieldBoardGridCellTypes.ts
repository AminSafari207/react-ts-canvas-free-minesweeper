import { Palette } from '@mui/material'
import { MineCounterValue } from 'src/core/game'
import { CellClickHandler } from './revealHandlerTypes'
import { LongPressHanlders } from './useCellLongPressTypes'
import { MinefieldCellStyles } from 'src/shared/store'

export type GetMineCounterColor = (value: MineCounterValue | null) => string

export type MinefieldBoardGridCellProps = {
  rowIndex: number
  colIndex: number
  cellStyles: MinefieldCellStyles
}

export interface CellBoxProps {
  isRevealed: boolean
  isExploded?: boolean
}

export interface NonRevealedCellProps {
  isFlagged: boolean
  onClick: CellClickHandler
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void
  longPressHandlers: LongPressHanlders
}

export type MineCounterDisplayProps = {
  value: MineCounterValue | null
}

export type MuiPaletteSection = keyof Pick<Palette, 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>
