import { GameStatus } from 'src/core/game'
import { StateUpdater } from 'src/shared/types'

export type MineFieldMetaData = {
  rowCount: number
  colCount: number
  totalMines: number
  flagLimit: number
  totalNonMineCells: number
  gameStatus: GameStatus
}

export interface MineFieldMetaDataStore extends MineFieldMetaData {
  updateMetaData: (metaDataUpdateArg: StateUpdater<MineFieldMetaData>) => void
  startNewGame: () => void
  pauseGame: () => void
  hasWon: () => boolean
}
