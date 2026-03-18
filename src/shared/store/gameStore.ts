import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createBoardSlice } from './boardSlice'
import { createConfigSlice } from './configSlice'
import { createGameplaySlice } from './gameplaySlice'
import { createTimerSlice } from './timerSlice'
import { GameStore } from './types/gameStoreTypes'

export const useGameStore = create<GameStore>()(
  persist(
    (...a) => ({
      ...createConfigSlice(...a),
      ...createGameplaySlice(...a),
      ...createBoardSlice(...a),
      ...createTimerSlice(...a),
    }),
    {
      name: 'minesweeper-data',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        rowCount: s.rowCount,
        colCount: s.colCount,
        totalMines: s.totalMines,
      }),
      version: 1,
    }
  )
)
