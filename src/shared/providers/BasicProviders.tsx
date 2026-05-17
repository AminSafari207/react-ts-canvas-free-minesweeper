import { PropsWithChildren } from 'react'
import { ModalHost } from 'src/core/modal'
import { Theme } from 'src/core/theme'
import { GameStatusEffectHost, MinefieldStylesEffectHost } from 'src/features/minefield'
import { GlobalErrorBoundary } from 'src/shared/error-boundary'
import { FullPageLoadingHost } from 'src/shared/loading'

export const BasicProviders = ({ children }: PropsWithChildren) => {
  return (
    <Theme>
      <GlobalErrorBoundary>
        {children}
        <ModalHost />
        <FullPageLoadingHost />
        <GameStatusEffectHost />
        <MinefieldStylesEffectHost />
      </GlobalErrorBoundary>
    </Theme>
  )
}
