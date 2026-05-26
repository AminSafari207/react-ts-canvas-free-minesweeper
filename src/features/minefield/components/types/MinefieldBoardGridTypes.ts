import { JSX } from 'react'
import { GameStatus } from 'src/core/game'

export interface MinefieldBoardGridProps {
  totalRows: number
  totalColumns: number
  gameStatus: GameStatus
  renderedCells: JSX.Element[]
}

export interface BoardSurfaceProps {
  totalRows: number
  totalColumns: number
  gameStatus: GameStatus
}
