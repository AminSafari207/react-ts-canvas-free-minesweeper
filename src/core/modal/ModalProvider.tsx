import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, styled } from '@mui/material'
import { PropsWithChildren } from 'react'
import { GlassyPaper } from 'src/shared/paper'
import { useModalStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'

const PaddedDialog = styled(Dialog)(() => ({ '& .MuiDialog-paper': { padding: '12px' }, zIndex: 10 }))

export function ModalProvider({ children }: PropsWithChildren) {
  const { open, variant, options, closeModal } = useModalStore(
    useShallow((s) => ({ open: s.open, variant: s.variant, options: s.options, closeModal: s.closeModal }))
  )

  return (
    <>
      {children}

      <PaddedDialog
        open={open}
        onClose={closeModal}
        maxWidth="sm"
        PaperComponent={GlassyPaper}
        {...('DialogProps' in options ? options.DialogProps : {})}
      >
        {variant === 'simple' && (
          <>
            {'title' in options && options.title && (
              <DialogTitle variant="h4" {...options.DialogTitleProps}>
                {options.title}
              </DialogTitle>
            )}
            {'titleDivider' in options && options.titleDivider && <Divider variant="middle" {...options.titleDividerProps} />}
            {'content' in options && options.content && <DialogContent {...options.DialogContentProps}>{options.content}</DialogContent>}
            {'contentDivider' in options && options.contentDivider && <Divider variant="middle" {...options.contentDividerProps} />}
            {'actions' in options && options.actions && <DialogActions {...options.DialogActionsProps}>{options.actions}</DialogActions>}
          </>
        )}

        {variant === 'custom' && 'render' in options && <options.render />}
      </PaddedDialog>
    </>
  )
}
