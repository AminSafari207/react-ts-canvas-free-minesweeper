import { CircularProgress, Fade, styled } from '@mui/material'
import { memo } from 'react'
import { shouldForwardPropWithBlackList } from 'src/shared/utils'
import { AnimatedLoadingText } from './AnimatedLoadingText'
import { resolveBackdropOptions } from './helpers/resolveBackdropOptions'
import { FullPageLoadingBackdropProps, FullPageLoadingProps } from './types/FullPageLoadingTypes'

export const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
}))

const FullPageLoadingBackdrop = styled('div', {
  shouldForwardProp: shouldForwardPropWithBlackList(['options']),
})<FullPageLoadingBackdropProps>(({ theme, options }) => {
  const resolvedOptions = resolveBackdropOptions(options, theme)

  return {
    position: 'fixed',
    zIndex: theme.zIndex.modal + 1,
    inset: 0,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
    pointerEvents: 'all',
    willChange: 'backdrop-filter',

    ...(resolvedOptions.kind === 'none' && {
      background: 'none',
      backdropFilter: 'none',
    }),

    ...(resolvedOptions.kind === 'solid' && {
      backdropFilter: 'none',
      backgroundColor: theme.alpha(resolvedOptions.color ?? theme.palette.grey[700], resolvedOptions.opacity ?? 0.4),
    }),

    ...(resolvedOptions.kind === 'blur' && {
      backdropFilter: `blur(${resolvedOptions.amount ?? 8}px)`,
      backgroundColor:
        resolvedOptions.color && resolvedOptions.opacity != null
          ? theme.alpha(resolvedOptions.color, resolvedOptions.opacity)
          : 'transparent',
    }),
  }
})

export const FullPageLoading = memo(
  (props: FullPageLoadingProps) => {
    const message = props.message
    const isVisible = props.visibility === 'visible'

    return (
      <Fade in={isVisible} timeout={200} unmountOnExit>
        <FullPageLoadingBackdrop options={props.options.backdrop}>
          <Spinner size={80} thickness={4} />
          {message && <AnimatedLoadingText text={message} />}
        </FullPageLoadingBackdrop>
      </Fade>
    )
  },
  (prev, next) => prev.visibility === next.visibility && prev.options === next.options && prev.message === next.message
)
