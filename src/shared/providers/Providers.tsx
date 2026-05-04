import { PropsWithChildren, Suspense } from 'react'
import { FullPageLoadingSuspenseFallback } from 'src/shared/loading'
import { BasicProviders } from './BasicProviders'
import { MinefieldBootstrap } from './MinefieldBootstrap'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <BasicProviders>
      <MinefieldBootstrap>
        <Suspense fallback={<FullPageLoadingSuspenseFallback />}>{children}</Suspense>
      </MinefieldBootstrap>
    </BasicProviders>
  )
}
