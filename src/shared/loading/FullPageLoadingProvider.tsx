import { PropsWithChildren, useCallback, useState } from 'react'
import { FullPageLoading } from './FullPageLoading'
import { LoadingContext, LoadingContextValue, LoadingState } from './LoadingContext'

export function FullPageLoadingProvider({ children }: PropsWithChildren) {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.HIDE)
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(undefined)

  const showLoading = useCallback((loadingState: LoadingState.SHOW | LoadingState.SHOW_NO_BACKGROUND, loadingMessage?: string) => {
    setLoadingState(loadingState)
    setLoadingMessage(loadingMessage)
  }, [])

  const hideLoading = useCallback(() => {
    setLoadingState(LoadingState.HIDE)
  }, [])

  const value: LoadingContextValue = { loadingState, loadingMessage, showLoading, hideLoading }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <FullPageLoading loadingState={loadingState} loadingMessage={loadingMessage} />
    </LoadingContext.Provider>
  )
}
