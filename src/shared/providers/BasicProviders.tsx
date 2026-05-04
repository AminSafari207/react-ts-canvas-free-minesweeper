import { PropsWithChildren } from 'react'
import { ModalHost } from 'src/core/modal'
import { Theme } from 'src/core/theme'
import { GlobalErrorBoundary } from 'src/shared/error-boundary'
import { FullPageLoadingHost } from 'src/shared/loading'

export const BasicProviders = ({ children, nonce }: PropsWithChildren<{ nonce?: string }>) => {
  return (
    <Theme>
      <GlobalErrorBoundary>
        {children}
        <ModalHost />
        <FullPageLoadingHost />
      </GlobalErrorBoundary>
    </Theme>
  )
}
