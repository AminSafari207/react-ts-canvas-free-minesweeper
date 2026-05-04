import { PropsWithChildren } from 'react'
import { ModalProvider } from 'src/core/modal'
import { Theme } from 'src/core/theme'
import { GlobalErrorBoundary } from 'src/shared/error-boundary'
import { FullPageLoadingHost } from 'src/shared/loading'

export const BasicProviders = ({ children, nonce }: PropsWithChildren<{ nonce?: string }>) => {
  return (
    <Theme>
      <GlobalErrorBoundary>
        <ModalProvider>{children}</ModalProvider>
        <FullPageLoadingHost />
      </GlobalErrorBoundary>
    </Theme>
  )
}
