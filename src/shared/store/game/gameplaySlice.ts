import { CellType, GameStatus, GeneratedMinefieldRecord } from 'src/core/game'
import { cancelAllMinefieldWorkers, generateMinefieldWorker } from 'src/workers'
import { StateCreator } from 'zustand'
import { boardSliceStateDefaults } from './boardSlice'
import { GameStore } from './types/gameStoreTypes'
import { GameplaySlice } from './types/gameplaySliceTypes'

export const gameplaySliceStateDefaults = {
  gameStatus: GameStatus.IDLE,
} satisfies Pick<GameplaySlice, 'gameStatus'>

export const createGameplaySlice: StateCreator<GameStore, [], [], GameplaySlice> = (set, get) => {
  const applyActiveMinefield = (generatedMinefield: GeneratedMinefieldRecord, options?: { consumeQueuedMinefield?: boolean }) => {
    set((s) => ({
      ...generatedMinefield,
      revealedSafeCells: 0,
      totalNonMineCells: s.totalRows * s.totalColumns - s.totalMines,
      gameStatus: GameStatus.PLAYING,
      boardSessionId: s.boardSessionId + 1,
      ...(options?.consumeQueuedMinefield ? { queuedMinefield: null } : null),
    }))
  }

  const hasOngoingGame = () => get().gameStatus === GameStatus.PLAYING

  return {
    ...gameplaySliceStateDefaults,

    changeGameStatus: (newGameStatus: GameStatus) => {
      set({ gameStatus: newGameStatus })
    },

    startInitialGame: async () => {
      const game = get()

      if (game.gameStatus === GameStatus.LOADING) return

      if (hasOngoingGame()) {
        if (!game.queuedMinefield) {
          game.prepareQueuedMinefield()
        }

        return
      }

      game.changeGameStatus(GameStatus.LOADING)
      game.stopTimer()
      cancelAllMinefieldWorkers()

      try {
        const generatedMinefield = await generateMinefieldWorker(game.totalRows, game.totalColumns, game.totalMines)

        applyActiveMinefield(generatedMinefield)
        game.resetTimer()
        game.startTimer()
        game.prepareQueuedMinefield()
      } catch (err) {
        console.error('Minefield generation failed: ', err)
        game.changeGameStatus(GameStatus.IDLE)
      }
    },

    restartGame: () => {
      const game = get()
      const queuedMinefield = game.queuedMinefield

      if (!queuedMinefield) {
        game.startInitialGame()
        return
      }

      game.stopTimer()
      applyActiveMinefield(queuedMinefield, { consumeQueuedMinefield: true })
      game.resetTimer()
      game.startTimer()
      game.prepareQueuedMinefield()
    },

    handleDimensionChange: () => {
      const game = get()

      set({ ...boardSliceStateDefaults, gameStatus: GameStatus.IDLE })

      game.startInitialGame()
    },

    prepareQueuedMinefield: async () => {
      const game = get()

      try {
        const generatedMinefield = await generateMinefieldWorker(game.totalRows, game.totalColumns, game.totalMines)

        set({ queuedMinefield: generatedMinefield })
      } catch (err) {
        console.error('Queued minefield generation faild: ', err)
        set({ queuedMinefield: null })
      }
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
        game.changeGameStatus(GameStatus.LOSE)

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
        game.changeGameStatus(GameStatus.WIN)
      }
    },
  }
}
