import { styled, Typography } from '@mui/material'
import { useTimerStore } from 'src/shared/store/useTimerStore'
import { useShallow } from 'zustand/shallow'
import { formatTime } from './formatTime'

const TimeTypo = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h2.fontSize,
  alignContent: 'center',
  pointerEvents: 'none',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
}))

export default function Timer() {
  const seconds = useTimerStore(useShallow((s) => s.seconds))

  return <TimeTypo color="info">{formatTime(seconds)}</TimeTypo>
}
