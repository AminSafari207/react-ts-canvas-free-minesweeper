import { FullPageLoadingOptions, FullPageLoadingOptionsBackdrop, FullPageLoadingVisibility } from 'src/shared/store'

export type FullPageLoadingProps = {
  visibility: FullPageLoadingVisibility
  options: FullPageLoadingOptions
  message: string
}

export type FullPageLoadingBackdropProps = {
  options: FullPageLoadingOptionsBackdrop
}
