import { useEffect } from 'react'
import { LoadingState } from './LoadingContext'
import { useFullPageLoading } from './useFullPageLoading'

export interface FullPageLoadingSuspenseFallbackProps {
  loadingState?: LoadingState.SHOW | LoadingState.SHOW_NO_BACKGROUND
  loadingMessage?: string
}

export const FullPageLoadingSuspenseFallback = ({
  loadingState = LoadingState.SHOW,
  loadingMessage = 'Loading...',
}: FullPageLoadingSuspenseFallbackProps) => {
  const { showLoading, hideLoading } = useFullPageLoading()

  useEffect(() => {
    showLoading(loadingState, loadingMessage)
    return () => {
      hideLoading()
    }
  }, [showLoading, hideLoading, loadingMessage, loadingState])

  return null
}
