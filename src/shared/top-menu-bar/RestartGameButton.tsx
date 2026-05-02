import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import { IconButton } from '@mui/material'
import { useGameStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'

export const RestartGameButton = () => {
  const startNewGame = useGameStore(useShallow((s) => s.startNewGame))

  return (
    <IconButton disableFocusRipple disableRipple disableTouchRipple size="small" sx={{ p: 0 }} onClick={startNewGame}>
      <RefreshRoundedIcon fontSize="large" />
    </IconButton>
  )
}
