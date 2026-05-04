import { useEffect } from 'react'
import { useLoadingStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'
import { FullPageLoadingSuspenseFallbackProps } from './types/FullPageLoadingSuspenseFallbackTypes'

export const FullPageLoadingSuspenseFallback = ({ options, message }: FullPageLoadingSuspenseFallbackProps) => {
  const { showDefaultFullPageLoading, showCustomFullPageLoading, closeFullPageLoading } = useLoadingStore(
    useShallow((s) => ({
      showDefaultFullPageLoading: s.showDefaultFullPageLoading,
      showCustomFullPageLoading: s.showCustomFullPageLoading,
      closeFullPageLoading: s.closeFullPageLoading,
    }))
  )

  useEffect(() => {
    if (options) showCustomFullPageLoading({ options, message })
    else showDefaultFullPageLoading({ message })

    return () => {
      closeFullPageLoading()
    }
  }, [showDefaultFullPageLoading, showDefaultFullPageLoading, closeFullPageLoading])

  return null
}
