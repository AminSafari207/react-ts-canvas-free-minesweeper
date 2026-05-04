import { StateCreator } from 'zustand'
import { FullPageLoadingOptions, FullPageLoadingSlice } from './types/fullPageLoadingSliceTypes'
import { LoadingStore } from './types/loadingStoreTypes'

const DEFAULT_MESSAGE = 'Loading App...'

const createDefaultOptions = (): FullPageLoadingOptions => ({
  backdrop: (theme) => ({
    kind: 'blur',
    amount: theme.spacing(2),
    color: theme.palette.grey[700],
    opacity: 0.4,
  }),
})

export const createFullPageLoadingSlice: StateCreator<LoadingStore, [], [], FullPageLoadingSlice> = (set) => ({
  fullPageLoadingVisibility: 'hidden',
  fullPageLoadingOptions: createDefaultOptions(),
  fullPageLoadingMessage: DEFAULT_MESSAGE,

  showDefaultFullPageLoading: (props) => {
    const fullPageLoadingMessage = props?.message ?? DEFAULT_MESSAGE

    set({
      fullPageLoadingVisibility: 'visible',
      fullPageLoadingOptions: createDefaultOptions(),
      fullPageLoadingMessage,
    })
  },

  showCustomFullPageLoading: (props) => {
    const fullPageLoadingMessage = props?.message ?? DEFAULT_MESSAGE

    set({
      fullPageLoadingVisibility: 'visible',
      fullPageLoadingOptions: { ...props.options },
      fullPageLoadingMessage,
    })
  },

  closeFullPageLoading: () => {
    set({
      fullPageLoadingVisibility: 'hidden',
      fullPageLoadingMessage: DEFAULT_MESSAGE,
    })
  },

  changeFullPageLoadingMessage: (message) => set({ fullPageLoadingMessage: message }),
})
