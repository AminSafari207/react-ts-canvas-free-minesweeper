import { ModalOptions, ModalVariant } from 'src/shared/store'

export type ModalProps = {
  open: boolean
  variant: ModalVariant
  options: ModalOptions
  onClose: () => void
}
