import { Divider, Stack, styled } from '@mui/material'
import { PropsWithChildren } from 'react'
import { DarkModeSwitch } from 'src/shared/dark-mode-switch'
import { GlassyPaper } from 'src/shared/paper'
import { RestartGameButton } from './RestartGameButton'
import GameSettingsIconButton from './settings/GameSettingsIconButton'
import Timer from './Timer'

const TopMenuWrapperPaper = styled(GlassyPaper)(({ theme }) => ({
  width: 'fit-content',
  padding: theme.spacing(2),
  pointerEvents: 'auto',
  touchAction: 'auto',
}))

const VertricalDivider = () => <Divider orientation="vertical" variant="middle" flexItem />

const InnerStack = ({ children }: PropsWithChildren) => (
  <Stack direction="row" spacing={1}>
    {children}
  </Stack>
)

export default function TopMenuBar() {
  return (
    <TopMenuWrapperPaper>
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
    </TopMenuWrapperPaper>
  )
}
