import { MineCounterValue } from 'src/core/game'
import { LongPressHanlders } from './useCellLongPressTypes'

export type GetMineCounterColor = (value: MineCounterValue | null) => string

export type MineFieldBoardGridCellProps = {
  rowIndex: number
  colIndex: number
  getMineCounterColor: GetMineCounterColor
}

export interface CellBoxProps {
  isExploded?: boolean
}

export interface NonSelectedCellProps {
  onClick: () => void
  onContextMenu: (e: React.MouseEvent<HTMLButtonElement>) => void
  longPressHandlers: LongPressHanlders
  isFlagged: boolean
}

export type MineCounterCellComponentProps = {
  counterValue: number | null
  counterColor: string
}
