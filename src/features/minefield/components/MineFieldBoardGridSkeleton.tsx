import { Box, Skeleton, styled } from '@mui/material'

const CELL_COUNT = 16

const Board = styled(Skeleton)(({ theme }) => ({
  width: 'calc(100vw - 10px)',
  height: 'calc(100vw - 10px)',
  maxWidth: 600,
  maxHeight: 600,
  border: `0.75rem ridge ${theme.alpha(theme.palette.grey[600], 0.5)}`,
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'grid',
  gridTemplateColumns: `repeat(${CELL_COUNT}, 1fr)`,
  gridTemplateRows: `repeat(${CELL_COUNT}, 1fr)`,
  animationDuration: '1s',
}))

const Cell = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[800]}`,
  visibility: 'visible',
}))

export const MineFieldBoardGridSkeleton = () => {
  return (
    <Board variant="rectangular">
      {Array.from({ length: CELL_COUNT * CELL_COUNT }).map((_, i) => (
        <Cell key={i} />
      ))}
    </Board>
  )
}
