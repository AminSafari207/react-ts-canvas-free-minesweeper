import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { Button, Divider, IconButton, Typography } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { GameStatus } from 'src/core/game'
import { useGameStore, useModalStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'

export const GameStatusEffectHost = () => {
  const { gameStatus, startNewGame } = useGameStore(
    useShallow((s) => ({
      gameStatus: s.gameStatus,
      startNewGame: s.startNewGame,
    }))
  )
  const { showSimpleModal, closeModal } = useModalStore(
    useShallow((s) => ({
      showSimpleModal: s.showSimpleModal,
      closeModal: s.closeModal,
    }))
  )

  const handleRestartClick = useCallback(() => {
    startNewGame()
    closeModal()
  }, [])

  useEffect(() => {
    if (gameStatus === GameStatus.WIN) {
      showSimpleModal({
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

    if (gameStatus === GameStatus.LOSE) {
      showSimpleModal({
        title: 'BOOM!',
        content: <Typography textAlign="center">Mine has been exploded!</Typography>,
        actions: (
          <>
            <Button variant="contained" onClick={handleRestartClick}>
              Play Again
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem />
            <IconButton disableRipple disableFocusRipple disableTouchRipple onClick={closeModal} color="secondary" sx={{ p: 0 }}>
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
  }, [gameStatus])

  return null
}
