import { GameStatus } from 'src/core/game'

export interface MinefieldBoardGridProps {
  totalRows: number
  totalColumns: number
  gameStatus: GameStatus
}

export interface BoardSurfaceProps {
  totalColumns: number
  gameStatus: GameStatus
}
