import { StateCreator } from 'zustand'
import { ConfigSlice } from './types/configSliceTypes'
import { GameStore } from './types/gameStoreTypes'

export const createConfigSlice: StateCreator<GameStore, [], [], ConfigSlice> = (set, get) => ({
  rowCount: 9,
  colCount: 9,
  totalMines: 10,
  flagLimit: -1, // TODO

  applyGameConfig: (options) => {
    if (!options || Object.keys(options).length === 0) {
      throw new Error('applyGameConfig called with empty options')
    }

    set(options)
  },
})
