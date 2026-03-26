import SettingsRounded from '@mui/icons-material/SettingsRounded'
import { IconButton } from '@mui/material'
import { useCallback } from 'react'
import { useModalStore } from 'src/shared/store'
import { SettingsBox } from './SettingsBox'

export default function GameSettingsIconButton() {
  const handleOnClick = useCallback(() => {
    const modal = useModalStore.getState()

    modal.showCustomModal({
      render: SettingsBox,
    })
  }, [])

  return (
    <IconButton disableFocusRipple disableRipple disableTouchRipple size="small" sx={{ p: 0 }} onClick={handleOnClick}>
      <SettingsRounded sx={{ fontSize: 32 }} />
    </IconButton>
  )
}
