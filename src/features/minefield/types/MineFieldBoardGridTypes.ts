import { GameStatus } from 'src/core/game'

export interface MineFieldBoardGridProps {
  rowCount: number
  colCount: number
  gameStatus: GameStatus
}

export interface BoardSurfaceProps {
  colCount: number
  gameStatus: GameStatus
}
