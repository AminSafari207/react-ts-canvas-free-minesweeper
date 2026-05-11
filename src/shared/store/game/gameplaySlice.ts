import { CellType, GameStatus } from 'src/core/game'
import { cancelAllMinefieldWorkers, generateMinefieldWorker } from 'src/workers'
import { StateCreator } from 'zustand'
import { GameStore } from './types/gameStoreTypes'
import { GameplaySlice } from './types/gameplaySliceTypes'

export const createGameplaySlice: StateCreator<GameStore, [], [], GameplaySlice> = (set, get) => ({
  gameStatus: GameStatus.IDLE,

  changeGameStatus: (newGameStatus: GameStatus) => {
    set({ gameStatus: newGameStatus })
  },

  startNewGame: () => {
    // const { gameStatus } = get()

    // if (gameStatus === GameStatus.LOADING) return

    // set({ gameStatus: GameStatus.LOADING })

    // setTimeout(() => {
    //   const { totalRows, totalColumns, totalMines, resetTimer, startTimer } = get()
    //   const { minefield, randomMineCellKeys, emptyRegions } = generateMinefield(totalRows, totalColumns, totalMines)

    //   resetTimer()
    //   set({
    //     cells: minefield,
    //     randomMineCellKeys,
    //     emptyRegions,
    //     revealedSafeCells: 0,
    //     totalNonMineCells: Math.max(10, totalRows * totalColumns - totalMines),
    //     gameStatus: GameStatus.PLAYING,
    //   })
    //   startTimer()
    // }, 1000)

    const { gameStatus, totalRows, totalColumns, totalMines } = get()

    if (gameStatus === GameStatus.LOADING) return

    set({ gameStatus: GameStatus.LOADING })

    cancelAllMinefieldWorkers()
    generateMinefieldWorker(totalRows, totalColumns, totalMines)
      .then(({ minefield, randomMineCellKeys, emptyRegions }) => {
        setTimeout(() => {
          const { resetTimer, startTimer } = get()

          resetTimer()

          set({
            cells: minefield,
            randomMineCellKeys,
            emptyRegions,
            revealedSafeCells: 0,
            totalNonMineCells: totalRows * totalColumns - totalMines,
            gameStatus: GameStatus.PLAYING,
          })

          startTimer()
        }, 1000)
      })
      .catch((error) => {
        console.error('Minefield generation failed:', error)
        set({ gameStatus: GameStatus.IDLE })
      })
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
