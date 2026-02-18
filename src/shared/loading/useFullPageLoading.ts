import { useContext } from 'react'
import { LoadingContext } from './LoadingContext'

export function useFullPageLoading() {
  const ctx = useContext(LoadingContext)
  if (!ctx) throw new Error('useFullPageLoading must be used within FullPageLoadingProvider')
  return ctx
}
