import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import { IconButton, styled } from '@mui/material'
import { useThemeMode } from 'src/core/theme'

const DarkModeIconButton = styled(IconButton, { shouldForwardProp: (prop) => prop !== 'whiteMode' })<DarkModeSwitchProps>(
  ({ theme, whiteMode }) => ({
    padding: 0,
    color: whiteMode && theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.info.main,
  })
)

interface DarkModeSwitchProps {
  whiteMode?: boolean
}

export const DarkModeSwitch = ({ whiteMode }: DarkModeSwitchProps) => {
  const { toggleColorMode, mode } = useThemeMode()

  const isDark = mode === 'dark'

  return (
    <DarkModeIconButton
      disableRipple
      disableFocusRipple
      disableTouchRipple
      whiteMode={whiteMode ?? false}
      onClick={() => toggleColorMode()}
    >
      {isDark ? <LightModeRoundedIcon fontSize="large" /> : <DarkModeRoundedIcon fontSize="large" />}
    </DarkModeIconButton>
  )
}
