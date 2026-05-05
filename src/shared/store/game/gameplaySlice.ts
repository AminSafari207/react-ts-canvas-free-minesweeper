import { CellType, GameStatus, generateMinefield } from 'src/core/game'
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
      const { minefield, randomMineCellKeys, emptyRegions } = generateMinefield(rowCount, colCount, totalMines)

      resetTimer()
      set({
        cells: minefield,
        randomMineCellKeys,
        emptyRegions,
        revealedSafeCells: 0,
        totalNonMineCells: Math.max(10, rowCount * colCount - totalMines),
        gameStatus: GameStatus.PLAYING,
      })
      startTimer()
    }, 0)
  },

  pauseGame: () => {}, // TODO

  revealCellWithEffects: (cellKey) => {
    const game = get()

    if (game.gameStatus !== GameStatus.PLAYING) return

    const cell = game.cells[cellKey]

    if (!cell || cell.isFlagged || cell.isRevealed) return

    if (cell.type === CellType.MINE) {
      game.explodeMine(cellKey)
      game.revealMultipleCells(game.randomMineCellKeys)
      game.stopTimer()
      set({ gameStatus: GameStatus.LOSE })

      return
    }

    if (cell.type === CellType.MINE_COUNTER) {
      game.revealCell(cellKey)
    }

    if (cell.type === CellType.EMPTY) {
      const regionId = cell.regionId

      if (regionId === undefined) {
        throw new Error(`Empty cell (${cellKey}) missing regionId`)
      }

      const region = game.emptyRegions[regionId]

      if (!region.isRevealed) {
        game.revealEmptyRegion(regionId)
      } else {
        game.revealCell(cellKey)
      }
    }

    if (game.hasWon()) {
      game.stopTimer()
      set({ gameStatus: GameStatus.WIN })
    }
  },
})
