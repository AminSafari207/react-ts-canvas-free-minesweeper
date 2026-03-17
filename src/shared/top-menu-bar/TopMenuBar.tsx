import { Divider, Stack } from '@mui/material'
import { PropsWithChildren } from 'react'
import { DarkModeSwitch } from 'src/shared/dark-mode-switch'
import { GlassyPaper } from 'src/shared/paper'
import GameSettingsIconButton from './GameSettingsIconButton'
import { RestartGameButton } from './RestartGameButton'
import Timer from './Timer'

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
          <RestartGameButton />
        </InnerStack>
        <VertricalDivider />
        <InnerStack>
          <Timer />
        </InnerStack>
      </Stack>
    </GlassyPaper>
  )
}
