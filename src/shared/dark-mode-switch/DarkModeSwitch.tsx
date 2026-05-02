import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import { IconButton, styled } from '@mui/material'
import { useShallow } from 'zustand/shallow'
import { useThemeStore } from '../store'
import { shouldForwardPropWithBlackList } from '../utils'

const DarkModeIconButton = styled(IconButton, { shouldForwardProp: shouldForwardPropWithBlackList(['whiteMode']) })<DarkModeSwitchProps>(
  ({ theme, whiteMode }) => ({
    padding: 0,
    color: whiteMode && theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.info.main,
  })
)

interface DarkModeSwitchProps {
  whiteMode?: boolean
}

export const DarkModeSwitch = ({ whiteMode }: DarkModeSwitchProps) => {
  const { toggleColorMode, themeMode } = useThemeStore(useShallow((s) => ({ themeMode: s.themeMode, toggleColorMode: s.toggleThemeMode })))

  const isDark = themeMode === 'dark'

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
