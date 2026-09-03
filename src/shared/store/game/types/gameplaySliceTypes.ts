import { CellKey, GameStatus } from 'src/core/game'

export interface GameplaySlice {
  gameStatus: GameStatus

  changeGameStatus: (newGameStatus: GameStatus) => void
  startInitialGame: () => void
  restartGame: () => void
  pauseGame: () => void
  prepareQueuedMinefield: () => void
  handleDimensionChange: () => void
  revealCellWithEffects: (cellKey: CellKey) => void
}
