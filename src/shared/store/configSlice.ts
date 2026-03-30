import { minefieldLimits } from 'src/shared/constants'
import { StateCreator } from 'zustand'
import { ConfigSlice } from './types/configSliceTypes'
import { GameStore } from './types/gameStoreTypes'

export const createConfigSlice: StateCreator<GameStore, [], [], ConfigSlice> = (set, get) => ({
  rowCount: minefieldLimits.dimensions.rows.min,
  colCount: minefieldLimits.dimensions.cols.min,
  totalMines: minefieldLimits.mines.count.min,
  flagLimit: -1, // TODO

  applyGameConfig: (options) => {
    if (!options || Object.keys(options).length === 0) {
      throw new Error('applyGameConfig called with empty options')
    }

    set(options)
  },
})
