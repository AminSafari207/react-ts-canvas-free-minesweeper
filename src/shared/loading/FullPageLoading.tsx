import { alpha, CircularProgress, styled } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { fadeEnterAndExit } from 'src/shared/transition'
import { AnimatedLoadingText } from './AnimatedLoadingText'
import { LoadingState } from './LoadingContext'

// const FullPageLoadingContainer = styled('div')<{ hasBackground: boolean; showBackground: boolean }>(
//   ({ theme, hasBackground, showBackground }) => ({
//     position: 'fixed',
//     inset: 0,
//     zIndex: theme.zIndex.modal + 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: hasBackground || showBackground ? alpha('#000000', 0.3) : 'transparent',
//     backdropFilter: 'blur(6px)',

//     ...fadeEnterAndExit(theme),
//   })
// )

export const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),

  ...fadeEnterAndExit(theme),
}))

export interface FullPageLoadingProps {
  loadingState: LoadingState
  loadingMessage?: string
}

// export function FullPageLoading({ loadingState, loadingMessage }: FullPageLoadingProps) {
//   const [showBackground, setShowBackground] = useState(false)

//   const nodeRef = useRef(null)
//   const isVisible = loadingState !== LoadingState.HIDE
//   const hasBackground = loadingState === LoadingState.SHOW

//   useEffect(() => {
//     if (loadingState === LoadingState.SHOW) {
//       setShowBackground(true)
//     }
//   }, [loadingState])

//   const handleOnExited = () => {
//     setShowBackground(false)
//   }

//   return (
//     <CSSTransition in={isVisible} timeout={300} classNames="fade" unmountOnExit nodeRef={nodeRef} onExited={handleOnExited}>
//       <FullPageLoadingContainer ref={nodeRef} hasBackground={hasBackground} showBackground={showBackground}>
//         <Spinner size={80} thickness={4} />
//         {loadingMessage && <AnimatedLoadingText text={loadingMessage} />}
//       </FullPageLoadingContainer>
//     </CSSTransition>
//   )
// }

const FullPageLoadingContainer = styled('div')<{ visibleBackground: boolean }>(({ theme, visibleBackground }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: theme.zIndex.modal + 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: visibleBackground ? alpha('#000000', 0.3) : 'transparent',
  backdropFilter: visibleBackground ? 'blur(6px)' : 'none',
  ...fadeEnterAndExit(theme),
}))

export function FullPageLoading({ loadingState, loadingMessage }: FullPageLoadingProps) {
  const [visibleBackground, setVisibleBackground] = useState(false)
  const nodeRef = useRef(null)

  const isVisible = loadingState !== LoadingState.HIDE

  useEffect(() => {
    if (loadingState === LoadingState.SHOW) {
      setVisibleBackground(true)
    }
  }, [loadingState])

  const handleOnExited = () => {
    setVisibleBackground(false)
  }

  return (
    <CSSTransition in={isVisible} timeout={300} classNames="fade" unmountOnExit nodeRef={nodeRef} onExited={handleOnExited}>
      <FullPageLoadingContainer ref={nodeRef} visibleBackground={visibleBackground}>
        <Spinner size={80} thickness={4} />
        {loadingMessage && <AnimatedLoadingText text={loadingMessage} />}
      </FullPageLoadingContainer>
    </CSSTransition>
  )
}
