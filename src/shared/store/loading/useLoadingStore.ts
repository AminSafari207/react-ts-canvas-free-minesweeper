import { create } from 'zustand'
import { createFullPageLoadingSlice } from './fullPageLoadingSlice'
import { LoadingStore } from './types/loadingStoreTypes'

export const useLoadingStore = create<LoadingStore>()((...a) => ({
  ...createFullPageLoadingSlice(...a),
}))
