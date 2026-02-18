import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRef } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { fadeEnterAndExit } from 'src/shared/transition'

const LoadingTextBase = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.h3.fontSize as string,
  fontWeight: theme.typography.fontWeightLight,

  ...fadeEnterAndExit(theme),
}))

export function AnimatedLoadingText({ text }: { text: string }) {
  const nodeRef = useRef(null)

  return (
    <SwitchTransition>
      <CSSTransition key={text} nodeRef={nodeRef} timeout={200} classNames="fade">
        <LoadingTextBase ref={nodeRef}>{text}</LoadingTextBase>
      </CSSTransition>
    </SwitchTransition>
  )
}
