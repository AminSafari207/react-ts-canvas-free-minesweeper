import { CircularProgress, Fade, styled } from '@mui/material'
import { useRef } from 'react'
import { AnimatedLoadingText } from './AnimatedLoadingText'
import { LoadingState } from './LoadingContext'

const FixedLoadingContainer = styled('div')<{ hasBackground: boolean }>(({ theme, hasBackground }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: hasBackground ? theme.palette.action.hover : 'transparent',
  backdropFilter: hasBackground ? 'blur(6px)' : 'none',
  zIndex: theme.zIndex.modal + 1,
}))

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}))

export interface LoadingSuspenseFallbackProps {
  loadingState: LoadingState
  loadingMessage?: string
}

export function LoadingSuspenseFallback({ loadingState, loadingMessage }: LoadingSuspenseFallbackProps) {
  const nodeRef = useRef(null)
  const isVisible = loadingState !== LoadingState.HIDE
  const hasBackground = loadingState === LoadingState.SHOW

  return (
    <Fade timeout={200} unmountOnExit>
      <FixedLoadingContainer ref={nodeRef} hasBackground={hasBackground}>
        <Spinner size={80} thickness={4} />
        {loadingMessage && <AnimatedLoadingText text={loadingMessage} />}
      </FixedLoadingContainer>
    </Fade>
  )
}
