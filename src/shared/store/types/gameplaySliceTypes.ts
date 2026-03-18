import { GameStatus } from 'src/core/game'

export interface GameplaySlice {
  gameStatus: GameStatus

  startNewGame: () => void
  pauseGame: () => void
}
