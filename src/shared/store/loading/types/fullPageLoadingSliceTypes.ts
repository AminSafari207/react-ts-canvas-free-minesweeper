import { Theme } from '@mui/material'

export type FullPageLoadingVisibility = 'hidden' | 'visible'

type WithTheme<T> = T | ((theme: Theme) => T)

export type FullPageLoadingOptionsBackdropResolved =
  | { kind: 'none' }
  | { kind: 'solid'; color?: string; opacity: number }
  | { kind: 'blur'; amount?: number | string; color?: string; opacity?: number }

export type FullPageLoadingOptionsBackdrop = WithTheme<FullPageLoadingOptionsBackdropResolved>

export type FullPageLoadingOptions = {
  backdrop: FullPageLoadingOptionsBackdrop
}

type ShowDefaultFullPageLoadingProps = {
  message?: string
}

type ShowCustomFullPageLoadingProps = {
  message?: string
  options: FullPageLoadingOptions
}

export interface FullPageLoadingSlice {
  fullPageLoadingVisibility: FullPageLoadingVisibility
  fullPageLoadingOptions: FullPageLoadingOptions
  fullPageLoadingMessage: string

  showDefaultFullPageLoading: (props?: ShowDefaultFullPageLoadingProps) => void
  showCustomFullPageLoading: (props: ShowCustomFullPageLoadingProps) => void
  closeFullPageLoading: () => void
  changeFullPageLoadingMessage: (message: string) => void
}
