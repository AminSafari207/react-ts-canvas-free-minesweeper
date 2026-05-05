import { PropsWithChildren } from 'react'
import { ModalHost } from 'src/core/modal'
import { Theme } from 'src/core/theme'
import { GameStatusEffectHost } from 'src/features/minefield'
import { GlobalErrorBoundary } from 'src/shared/error-boundary'
import { FullPageLoadingHost } from 'src/shared/loading'

export const BasicProviders = ({ children, nonce }: PropsWithChildren<{ nonce?: string }>) => {
  return (
    <Theme>
      <GlobalErrorBoundary>
        {children}
        <ModalHost />
        <FullPageLoadingHost />
        <GameStatusEffectHost />
      </GlobalErrorBoundary>
    </Theme>
  )
}
