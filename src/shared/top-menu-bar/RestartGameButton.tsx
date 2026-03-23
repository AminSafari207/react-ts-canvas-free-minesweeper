import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import { IconButton } from '@mui/material'
import { useGameStore } from 'src/shared/store'

const { startNewGame } = useGameStore.getState()

export const RestartGameButton = () => {
  return (
    <IconButton disableFocusRipple disableRipple disableTouchRipple size="small" sx={{ p: 0 }} onClick={startNewGame}>
      <RefreshRoundedIcon fontSize="large" />
    </IconButton>
  )
}
