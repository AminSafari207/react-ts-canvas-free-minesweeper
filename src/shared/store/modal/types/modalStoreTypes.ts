import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import { ReactNode } from 'react'

interface BaseModalOptions {
  DialogProps?: Partial<React.ComponentProps<typeof Dialog>>
  titleDivider?: boolean
  contentDivider?: boolean
  titleDividerProps?: Partial<React.ComponentProps<typeof Divider>>
  contentDividerProps?: Partial<React.ComponentProps<typeof Divider>>
}

interface SimpleModalOptions extends BaseModalOptions {
  title?: string
  content?: ReactNode
  actions?: ReactNode
  DialogProps?: Partial<React.ComponentProps<typeof Dialog>>
  DialogTitleProps?: Partial<React.ComponentProps<typeof DialogTitle>>
  DialogContentProps?: Partial<React.ComponentProps<typeof DialogContent>>
  DialogActionsProps?: Partial<React.ComponentProps<typeof DialogActions>>
}

interface CustomModalOptions extends BaseModalOptions {
  render: () => ReactNode
  DialogProps?: Partial<React.ComponentProps<typeof Dialog>>
}

type ModalVariant = 'simple' | 'custom'
type ModalOptions = SimpleModalOptions | CustomModalOptions

interface ModalState {
  open: boolean
  variant: ModalVariant
  options: ModalOptions | {}
}

export interface ModalStore extends ModalState {
  showSimpleModal: (options: SimpleModalOptions) => void
  showCustomModal: (options: CustomModalOptions) => void
  closeModal: () => void
}
