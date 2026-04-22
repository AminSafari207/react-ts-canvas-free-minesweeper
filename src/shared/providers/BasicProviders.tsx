import { PropsWithChildren } from 'react'
import { ModalProvider } from 'src/core/modal'
import { Theme } from 'src/core/theme'
import { GlobalErrorBoundary } from 'src/shared/error-boundary'

export const BasicProviders = ({ children, nonce }: PropsWithChildren<{ nonce?: string }>) => {
  return (
    <Theme>
      <GlobalErrorBoundary>
        <ModalProvider>{children}</ModalProvider>
      </GlobalErrorBoundary>
    </Theme>
  )
}
