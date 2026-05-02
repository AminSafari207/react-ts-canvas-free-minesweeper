import { create } from 'zustand'
import { ModalStore } from './types/modalStoreTypes'

export const useModalStore = create<ModalStore>((set, get) => ({
  open: false,
  variant: 'simple',
  options: {},

  showSimpleModal: (options) => {
    set({ open: true, variant: 'simple', options })
  },
  showCustomModal: (options) => {
    set({ open: true, variant: 'custom', options })
  },
  closeModal: (_?: object, reason?: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    set({ open: false })
  },
}))
