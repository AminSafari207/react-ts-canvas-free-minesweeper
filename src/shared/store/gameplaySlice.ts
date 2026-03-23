import { GameStatus, generateMineField } from 'src/core/game'
import { StateCreator } from 'zustand'
import { GameStore } from './types/gameStoreTypes'
import { GameplaySlice } from './types/gameplaySliceTypes'

export const createGameplaySlice: StateCreator<GameStore, [], [], GameplaySlice> = (set, get) => ({
  gameStatus: GameStatus.IDLE,

  changeGameStatus: (newGameStatus: GameStatus) => {
    set({ gameStatus: newGameStatus })
  },

  startNewGame: () => {
    const { gameStatus } = get()

    if (gameStatus === GameStatus.LOADING) return

    set({ gameStatus: GameStatus.LOADING })

    setTimeout(() => {
      const { rowCount, colCount, totalMines, resetTimer, startTimer } = get()
      const { mineField, randomMineCellKeys } = generateMineField(rowCount, colCount, totalMines)

      resetTimer()
      set({
        cells: mineField,
        randomMineCellKeys,
        revealedSafeCells: 0,
        totalNonMineCells: Math.max(10, rowCount * colCount - totalMines),
        gameStatus: GameStatus.PLAYING,
      })
      startTimer()
    }, 0)
  },

  pauseGame: () => {}, // TODO
})
