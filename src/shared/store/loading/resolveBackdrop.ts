import { Theme } from '@mui/material'
import { FullPageLoadingBackdrop } from './types/fullPageLoadingSliceTypes'

export const resolveBackdrop = (backdrop: FullPageLoadingBackdrop, theme: Theme): FullPageLoadingBackdropResolved =>
  typeof backdrop === 'function' ? backdrop(theme) : backdrop
