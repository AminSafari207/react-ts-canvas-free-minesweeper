import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { Button, Divider, IconButton, Typography } from '@mui/material'
import { useGameStore, useModalStore } from 'src/shared/store'
import { ShowGameResultModalFn } from '../../types/revealHandlerTypes'

export const showGameResultModal: ShowGameResultModalFn = (revealResult) => {
  const game = useGameStore.getState()
  const modal = useModalStore.getState()

  const handleRestartClick = () => {
    game.startNewGame()
    modal.closeModal()
  }

  if (revealResult.type === 'LOSE') {
    modal.showSimpleModal({
      title: 'BOOM!',
      content: <Typography textAlign="center">Mine has been exploded!</Typography>,
      actions: (
        <>
          <Button variant="contained" onClick={handleRestartClick}>
            Play Again
          </Button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <IconButton disableRipple disableFocusRipple disableTouchRipple onClick={modal.closeModal} color="secondary" sx={{ p: 0 }}>
            <VisibilityRoundedIcon fontSize="large" />
          </IconButton>
        </>
      ),
      DialogTitleProps: {
        variant: 'h3',
        textAlign: 'center',
        color: 'error',
      },
      DialogActionsProps: {
        sx: { mx: 'auto' },
      },
    })
  }

  if (revealResult.type === 'WIN') {
    modal.showSimpleModal({
      title: 'Victory!',
      content: <Typography textAlign="center">You've found all of the mines!</Typography>,
      actions: (
        <Button variant="contained" onClick={handleRestartClick}>
          Play Again
        </Button>
      ),
      DialogTitleProps: {
        variant: 'h3',
        textAlign: 'center',
        color: 'success',
      },
      DialogActionsProps: {
        sx: { mx: 'auto' },
      },
    })
  }
}
