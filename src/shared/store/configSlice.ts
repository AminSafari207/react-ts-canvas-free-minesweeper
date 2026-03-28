import { boardLimits } from 'src/shared/constants'
import { StateCreator } from 'zustand'
import { ConfigSlice } from './types/configSliceTypes'
import { GameStore } from './types/gameStoreTypes'

export const createConfigSlice: StateCreator<GameStore, [], [], ConfigSlice> = (set, get) => ({
  rowCount: boardLimits.rows.min,
  colCount: boardLimits.cols.min,
  totalMines: boardLimits.mines.min,
  flagLimit: -1, // TODO

  applyGameConfig: (options) => {
    if (!options || Object.keys(options).length === 0) {
      throw new Error('applyGameConfig called with empty options')
    }

    set(options)
  },
})
