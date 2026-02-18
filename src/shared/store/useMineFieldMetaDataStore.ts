import { GameStatus, generateMineField } from 'src/core/game'
import { create } from 'zustand'
import { calculateTotalNonMineCells } from './calculateTotalNonMineCells'
import { handlePartialUpdate } from './handlePartialUpdate'
import { MineFieldMetaData, MineFieldMetaDataStore } from './types/mineFieldMetaDataStoreTypes'
import { useMineFieldCellStore } from './useMineFieldCellStore'
import { useTimerStore } from './useTimerStore'

export const useMineFieldMetaDataStore = create<MineFieldMetaDataStore>((set, get) => ({
  rowCount: 9,
  colCount: 9,
  totalMines: 10,
  flagLimit: -1,
  gameStatus: GameStatus.LOADING,
  totalNonMineCells: 0,

  updateMetaData: (metaData) => {
    set((s) => handlePartialUpdate<MineFieldMetaData>(s, metaData))
  },
  startNewGame: () => {
    set({ gameStatus: GameStatus.LOADING })

    const { updateAllCells, updateRandomMineCellKeys, resetTotalRevealedSafeCells } = useMineFieldCellStore.getState()
    const { resetTimer, startTimer } = useTimerStore.getState()
    const { rowCount, colCount, totalMines } = get()

    setTimeout(() => {
      const { mineField, randomMineCellKeys } = generateMineField(rowCount, colCount, totalMines)

      resetTimer()
      updateAllCells(mineField)
      updateRandomMineCellKeys(randomMineCellKeys)
      resetTotalRevealedSafeCells()
      startTimer()

      set({
        totalNonMineCells: calculateTotalNonMineCells(rowCount, colCount, totalMines),
        gameStatus: GameStatus.PLAYING,
      })
    }, 0)
  },
  pauseGame: () => {},
  hasWon: () => {
    const totalRevealedSafeCells = useMineFieldCellStore.getState().totalRevealedSafeCells
    const totalNonMineCells = get().totalNonMineCells
    return totalRevealedSafeCells === totalNonMineCells
  },
}))
