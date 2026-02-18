import { PropsWithChildren } from 'react'
import { ModalProvider } from 'src/core/modal'
import { Theme } from 'src/core/theme'

export const BasicProviders = ({ children, nonce }: PropsWithChildren<{ nonce?: string }>) => {
  return (
    <Theme>
      <ModalProvider>{children}</ModalProvider>
    </Theme>
  )
}
