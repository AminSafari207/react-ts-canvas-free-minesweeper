import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createBoardSlice } from './boardSlice'
import { createCellStyleSlice } from './cellStyleSlice'
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
      ...createCellStyleSlice(...a),
    }),
    {
      name: 'game-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        totalRows: s.totalRows,
        totalColumns: s.totalColumns,
        totalMines: s.totalMines,
      }),
      version: 1,
    }
  )
)
