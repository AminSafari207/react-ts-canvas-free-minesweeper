import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import { IconButton } from '@mui/material'
import { useMineFieldMetaDataStore } from 'src/shared/store'

const { startNewGame } = useMineFieldMetaDataStore.getState()

export const RestartGameButton = () => {
  return (
    <IconButton disableFocusRipple disableRipple disableTouchRipple size="small" sx={{ p: 0 }} onClick={startNewGame}>
      <RefreshRoundedIcon fontSize="large" />
    </IconButton>
  )
}
