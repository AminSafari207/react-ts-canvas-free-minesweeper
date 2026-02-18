import { createContext } from 'react'

export enum LoadingState {
  HIDE,
  SHOW,
  SHOW_NO_BACKGROUND,
}

export interface LoadingContextValue {
  loadingState: LoadingState
  loadingMessage?: string
  showLoading: (loadingState: LoadingState.SHOW | LoadingState.SHOW_NO_BACKGROUND, loadingMessage?: string) => void
  hideLoading: (forceFullPage?: boolean) => void
}

export const LoadingContext = createContext<LoadingContextValue | null>(null)
