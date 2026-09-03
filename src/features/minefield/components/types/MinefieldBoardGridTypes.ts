import { GameStatus } from 'src/core/game'
import { MinefieldCellStyles } from 'src/shared/store'

export interface MinefieldBoardGridProps {
  totalRows: number
  totalColumns: number
  gameStatus: GameStatus
  cellStyles: MinefieldCellStyles
}

export interface BoardSurfaceProps {
  totalRows: number
  totalColumns: number
  gameStatus: GameStatus
  isFullyMounted: boolean
}
