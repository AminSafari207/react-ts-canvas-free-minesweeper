import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import { IconButton } from '@mui/material'
import { useGameStore } from 'src/shared/store'

export const RestartGameButton = () => {
  const game = useGameStore.getState()

  return (
    <IconButton disableFocusRipple disableRipple disableTouchRipple size="small" sx={{ p: 0 }} onClick={game.startNewGame}>
      <RefreshRoundedIcon fontSize="large" />
    </IconButton>
  )
}
