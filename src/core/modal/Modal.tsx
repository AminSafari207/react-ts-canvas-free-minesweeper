import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, styled } from '@mui/material'
import { GlassyPaper } from 'src/shared/paper'
import { ModalProps } from './types/ModalTypes'

const PaddedDialog = styled(Dialog)(() => ({ '& .MuiDialog-paper': { padding: '12px' }, zIndex: 10 }))

export const Modal = ({ open, variant, options, onClose }: ModalProps) => {
  return (
    <PaddedDialog
      open={open}
      onClose={onClose}
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
  )
}
