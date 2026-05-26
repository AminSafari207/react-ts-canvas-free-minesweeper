import { StateCreator } from 'zustand'
import { ConfigSlice } from './types/configSliceTypes'
import { GameStore } from './types/gameStoreTypes'
import { minefieldConfig } from 'src/shared/constants'

export const createConfigSlice: StateCreator<GameStore, [], [], ConfigSlice> = (set) => ({
  totalRows: minefieldConfig.limits.dimensions.rows.min,
  totalColumns: minefieldConfig.limits.dimensions.cols.min,
  totalMines: minefieldConfig.limits.mines.count.min,
  flagLimit: -1, // TODO

  applyGameConfig: (options) => {
    if (!options || Object.keys(options).length === 0) {
      throw new Error('applyGameConfig called with empty options')
    }

    set(options)
  },
})
