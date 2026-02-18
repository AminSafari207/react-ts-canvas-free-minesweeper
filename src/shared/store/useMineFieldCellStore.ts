import { CellKey, MineFieldCell } from 'src/core/game'
import { create } from 'zustand'
import { MineFieldCellStore } from './types/mineFieldCellStoreTypes'

export const useMineFieldCellStore = create<MineFieldCellStore>((set) => ({
  cells: {},
  randomMineCellKeys: [],
  totalRevealedSafeCells: 0,

  updateAllCells: (newCells) => set({ cells: newCells }),
  updateRandomMineCellKeys: (cellKeys) => {
    set({ randomMineCellKeys: cellKeys })
  },
  selectCell: (cellKey) => {
    set((s) => {
      const cellState = s.cells[cellKey]

      if (cellState.isSelected || cellState.isFlagged) return s

      return {
        cells: { ...s.cells, [cellKey]: { ...s.cells[cellKey], isSelected: true } },
        totalRevealedSafeCells: s.totalRevealedSafeCells + 1,
      }
    })
  },
  selectMultipleCells: (cellKeys) => {
    set((s) => {
      const cellRecord: Record<CellKey, MineFieldCell> = {}
      let cellRecordLength: number = 0

      cellKeys?.forEach((cellKey) => {
        const cellState = s.cells[cellKey]

        if (cellState.isSelected || cellState.isFlagged) return

        cellRecord[cellKey] = { ...cellState, isSelected: true }
        cellRecordLength++
      })

      if (!cellRecordLength) return s

      const newTotalRevealedSafeCells = s.totalRevealedSafeCells + cellRecordLength

      return {
        cells: { ...s.cells, ...cellRecord },
        totalRevealedSafeCells: newTotalRevealedSafeCells,
      }
    })
  },
  explodeMine: (cellKey) => {
    set((s) => {
      const cellState = s.cells[cellKey]

      if (cellState.isSelected) return s

      return {
        cells: { ...s.cells, [cellKey]: { ...s.cells[cellKey], isSelected: true, isExploded: true } },
      }
    })
  },
  toggleFlagCell: (cellKey) => {
    set((s) => ({ cells: { ...s.cells, [cellKey]: { ...s.cells[cellKey], isFlagged: !s.cells[cellKey]['isFlagged'] } } }))
  },
  resetTotalRevealedSafeCells: () => {
    set({ totalRevealedSafeCells: 0 })
  },
}))
