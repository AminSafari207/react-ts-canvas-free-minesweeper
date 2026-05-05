import { CellKey, GameStatus } from 'src/core/game'

export interface GameplaySlice {
  gameStatus: GameStatus

  changeGameStatus: (newGameStatus: GameStatus) => void
  startNewGame: () => void
  pauseGame: () => void
  revealCellWithEffects: (cellKey: CellKey) => void
}
