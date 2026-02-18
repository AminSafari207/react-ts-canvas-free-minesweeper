import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import { Divider, IconButton, Stack } from '@mui/material'
import { PropsWithChildren } from 'react'
import { DarkModeSwitch } from 'src/shared/dark-mode-switch'
import { GlassyPaper } from 'src/shared/paper'
import { useMineFieldMetaDataStore } from 'src/shared/store/useMineFieldMetaDataStore'
import GameSettingsIconButton from './GameSettingsIconButton'
import Timer from './Timer'

const { startNewGame } = useMineFieldMetaDataStore.getState()

const VertricalDivider = () => <Divider orientation="vertical" variant="middle" flexItem />

const InnerStack = ({ children }: PropsWithChildren) => (
  <Stack direction="row" spacing={1}>
    {children}
  </Stack>
)

export default function TopMenuBar() {
  return (
    <GlassyPaper sx={{ width: 'fit-content', p: 2, borderRadius: 8, pointerEvents: 'auto', touchAction: 'auto' }}>
      <Stack direction="row" spacing={1.5}>
        <InnerStack>
          <DarkModeSwitch />
        </InnerStack>
        <VertricalDivider />
        <InnerStack>
          <GameSettingsIconButton />
          <IconButton disableFocusRipple disableRipple disableTouchRipple size="small" sx={{ p: 0 }} onClick={startNewGame}>
            <RefreshRoundedIcon fontSize="large" />
          </IconButton>
        </InnerStack>
        <VertricalDivider />
        <InnerStack>
          <Timer />
        </InnerStack>
      </Stack>
    </GlassyPaper>
  )
}
