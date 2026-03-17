import { GameStatus, generateMineField } from 'src/core/game'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { calculateTotalNonMineCells } from './calculateTotalNonMineCells'
import { handlePartialUpdate } from './handlePartialUpdate'
import { MineFieldMetaData, MineFieldMetaDataStore } from './types/mineFieldMetaDataStoreTypes'
import { useMineFieldCellStore } from './useMineFieldCellStore'
import { useTimerStore } from './useTimerStore'

const mineFieldMetaDataStore: StateCreator<MineFieldMetaDataStore> = (set, get) => ({
  rowCount: 9,
  colCount: 9,
  totalMines: 10,
  flagLimit: -1, // TODO
  gameStatus: GameStatus.LOADING,

  updateMetaData: (metaData) => {
    set((s) => handlePartialUpdate<MineFieldMetaData>(s, metaData))
  },

  startNewGame: () => {
    set({ gameStatus: GameStatus.LOADING })

    const { updateAllCells, updateRandomMineCellKeys, resetRevealedSafeCells } = useMineFieldCellStore.getState()
    const { resetTimer, startTimer } = useTimerStore.getState()
    const updateCellStore = useMineFieldCellStore.setState
    const { rowCount, colCount, totalMines } = get()

    setTimeout(() => {
      set(() => {
        const { mineField, randomMineCellKeys } = generateMineField(rowCount, colCount, totalMines)

        resetTimer()
        updateAllCells(mineField)
        updateRandomMineCellKeys(randomMineCellKeys)
        resetRevealedSafeCells()
        startTimer()
        updateCellStore({ totalNonMineCells: calculateTotalNonMineCells(rowCount, colCount, totalMines) })

        return { gameStatus: GameStatus.PLAYING }
      })
    }, 0)
  },

  pauseGame: () => {}, // TODO
})

const withPersist = persist(mineFieldMetaDataStore, {
  name: 'minesweeper-meta',
  storage: createJSONStorage(() => localStorage),
  partialize: (s) => ({
    rowCount: s.rowCount,
    colCount: s.colCount,
    totalMines: s.totalMines,
  }),
})

export const useMineFieldMetaDataStore = create<MineFieldMetaDataStore>()(withPersist)
