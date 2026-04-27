import { PropsWithChildren, Suspense } from 'react'
import { FullPageLoadingProvider, FullPageLoadingSuspenseFallback, LoadingState } from 'src/shared/loading'  
import { BasicProviders } from './BasicProviders'
import { MineFieldBootstrap } from './MineFieldBootstrap'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <BasicProviders>
      <MineFieldBootstrap>
        <FullPageLoadingProvider>
          <Suspense
            fallback={<FullPageLoadingSuspenseFallback loadingState={LoadingState.SHOW_NO_BACKGROUND} loadingMessage="Loading Game..." />}
          >
            {children}
          </Suspense>
        </FullPageLoadingProvider>
      </MineFieldBootstrap>
    </BasicProviders>
  )
}
