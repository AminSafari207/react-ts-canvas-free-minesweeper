import { Fade, styled, Typography } from '@mui/material'
import { SwitchTransition } from 'react-transition-group'

const LoadingTextBase = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.h3.fontSize as string,
  fontWeight: theme.typography.fontWeightLight,
}))

export function AnimatedLoadingText({ text }: { text: string }) {
  return (
    <SwitchTransition>
      <Fade key={text} timeout={200}>
        <LoadingTextBase>{text}</LoadingTextBase>
      </Fade>
    </SwitchTransition>
  )
}
