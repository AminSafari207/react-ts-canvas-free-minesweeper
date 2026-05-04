import { useModalStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'
import { Modal } from './Modal'

export function ModalHost() {
  const { open, variant, options, closeModal } = useModalStore(
    useShallow((s) => ({ open: s.open, variant: s.variant, options: s.options, closeModal: s.closeModal }))
  )

  return <Modal open={open} variant={variant} options={options} onClose={closeModal} />
}
