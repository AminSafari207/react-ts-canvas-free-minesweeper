import { Theme } from '@mui/material'
import { FullPageLoadingOptionsBackdrop, FullPageLoadingOptionsBackdropResolved } from 'src/shared/store'

export const resolveBackdropOptions = (backdrop: FullPageLoadingOptionsBackdrop, theme: Theme): FullPageLoadingOptionsBackdropResolved =>
  typeof backdrop === 'function' ? backdrop(theme) : backdrop
