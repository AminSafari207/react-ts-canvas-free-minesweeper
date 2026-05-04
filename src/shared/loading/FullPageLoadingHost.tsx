import { useLoadingStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'
import { FullPageLoading } from './FullPageLoading'

export function FullPageLoadingHost() {
  const { fullPageLoadingVisibility, fullPageLoadingOptions, fullPageLoadingMessage } = useLoadingStore(
    useShallow((s) => ({
      fullPageLoadingVisibility: s.fullPageLoadingVisibility,
      fullPageLoadingOptions: s.fullPageLoadingOptions,
      fullPageLoadingMessage: s.fullPageLoadingMessage,
    }))
  )

  return <FullPageLoading visibility={fullPageLoadingVisibility} options={fullPageLoadingOptions} message={fullPageLoadingMessage} />
}
