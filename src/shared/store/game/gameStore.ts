import { GameStatus } from 'src/core/game'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { boardSliceStateDefaults, createBoardSlice } from './boardSlice'
import { createCellStyleSlice } from './cellStyleSlice'
import { createConfigSlice } from './configSlice'
import { createGameplaySlice, gameplaySliceStateDefaults } from './gameplaySlice'
import { createTimerSlice, timerSliceStateDefaults } from './timerSlice'
import { GameStore } from './types/gameStoreTypes'

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createConfigSlice(...a),
        ...createGameplaySlice(...a),
        ...createBoardSlice(...a),
        ...createTimerSlice(...a),
        ...createCellStyleSlice(...a),
      }),
      {
        name: 'game-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (s) => ({
          totalRows: s.totalRows,
          totalColumns: s.totalColumns,
          totalMines: s.totalMines,

          cells: s.cells,
          randomMineCellKeys: s.randomMineCellKeys,
          emptyRegions: s.emptyRegions,
          revealedSafeCells: s.revealedSafeCells,
          totalNonMineCells: s.totalNonMineCells,

          gameStatus: s.gameStatus === GameStatus.PLAYING ? GameStatus.PLAYING : GameStatus.IDLE,

          seconds: s.seconds,
        }),
        migrate: (persistedState: any, version) => {
          if (version < 2) {
            return {
              ...persistedState,
              ...boardSliceStateDefaults,
              ...gameplaySliceStateDefaults,
              ...timerSliceStateDefaults,
            }
          }

          return persistedState
        },
        version: 2,
      }
    )
  )
)
