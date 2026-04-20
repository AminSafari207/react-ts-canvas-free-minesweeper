import { CellKey, MineFieldCell, MineFieldRecord } from 'src/core/game'
import { StateCreator } from 'zustand'
import { BoardSlice } from './types/boardSliceTypes'
import { GameStore } from './types/gameStoreTypes'

export const createBoardSlice: StateCreator<GameStore, [], [], BoardSlice> = (set, get) => ({
  cells: {},
  randomMineCellKeys: [],
  emptyRegions: [],
  revealedSafeCells: 0,
  totalNonMineCells: 0,

  revealCell: (cellKey) => {
    set((s) => {
      const cellState = s.cells[cellKey]

      if (cellState.isRevealed || cellState.isFlagged) return s

      return {
        cells: { ...s.cells, [cellKey]: { ...s.cells[cellKey], isRevealed: true } },
        revealedSafeCells: s.revealedSafeCells + 1,
      }
    })
  },

  revealMultipleCells: (cellKeys) => {
    set((s) => {
      const cellRecord: Record<CellKey, MineFieldCell> = {}
      let cellRecordLength: number = 0

      cellKeys?.forEach((cellKey) => {
        const cellState = s.cells[cellKey]

        if (cellState.isRevealed || cellState.isFlagged) return

        cellRecord[cellKey] = { ...cellState, isRevealed: true }
        cellRecordLength++
      })

      if (!cellRecordLength) return s

      const newRevealedSafeCells = s.revealedSafeCells + cellRecordLength

      return {
        cells: { ...s.cells, ...cellRecord },
        revealedSafeCells: newRevealedSafeCells,
      }
    })
  },

  revealEmptyRegion: (regionId) => {
    set((s) => {
      const emptyRegions = s.emptyRegions

      if (regionId < 0 || regionId >= emptyRegions.length) {
        throw new RangeError(`Invalid regionId: ${regionId}`)
      }

      const { members, borderCounters } = emptyRegions[regionId]

      const cellRecord: MineFieldRecord = {}
      let revealCount = 0

      for (let i = 0; i < members.length; i++) {
        const key = members[i]
        const cell = s.cells[key]

        if (!cell.isRevealed && !cell.isFlagged) {
          cellRecord[key] = { ...cell, isRevealed: true }
          revealCount++
        }
      }

      for (let i = 0; i < borderCounters.length; i++) {
        const key = borderCounters[i]
        const cell = s.cells[key]

        if (!cell.isRevealed && !cell.isFlagged) {
          cellRecord[key] = { ...cell, isRevealed: true }
          revealCount++
        }
      }

      if (revealCount === 0) return s

      return {
        cells: { ...s.cells, ...cellRecord },
        revealedSafeCells: s.revealedSafeCells + revealCount,
      }
    })
  },

  explodeMine: (cellKey) => {
    set((s) => {
      const cellState = s.cells[cellKey]

      if (cellState.isRevealed) return s

      return {
        cells: { ...s.cells, [cellKey]: { ...s.cells[cellKey], isRevealed: true, isExploded: true } },
      }
    })
  },

  toggleFlagCell: (cellKey) => {
    set((s) => ({ cells: { ...s.cells, [cellKey]: { ...s.cells[cellKey], isFlagged: !s.cells[cellKey]['isFlagged'] } } }))
  },

  hasWon: () => {
    const { revealedSafeCells, totalNonMineCells } = get()
    return revealedSafeCells === totalNonMineCells
  },
})
