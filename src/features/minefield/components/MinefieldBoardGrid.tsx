import { styled } from '@mui/material'
import { GameStatus } from 'src/core/game'
import { BoardSurfaceProps, MinefieldBoardGridProps } from 'src/features/minefield/types/MinefieldBoardGridTypes'
import { minefieldUI } from 'src/shared/constants'
import { GlassyPaper } from 'src/shared/paper'
import { shouldForwardPropWithBlackList } from 'src/shared/utils'

const CELL_SIZE = minefieldUI.cellSize

const BoardSurface = styled(GlassyPaper, {
  shouldForwardProp: shouldForwardPropWithBlackList(['totalRows', 'totalColumns', 'gameStatus']),
})<BoardSurfaceProps>(({ theme, totalRows, totalColumns, gameStatus }) => {
  const isPlaying = gameStatus === GameStatus.PLAYING
  const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]

  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${totalColumns}, ${CELL_SIZE}px)`,
    minWidth: 'fit-content',
    minHeight: CELL_SIZE * totalRows,
    padding: 0,
    border: `0.75rem ridge ${borderColor}`,
    overflow: 'hidden',
    pointerEvents: isPlaying ? 'auto' : 'none',
  }
})

export default function MinefieldBoardGrid({ totalRows, totalColumns, gameStatus, renderedCells }: MinefieldBoardGridProps) {
  return (
    <BoardSurface totalRows={totalRows} totalColumns={totalColumns} gameStatus={gameStatus} onContextMenu={(e) => e.preventDefault()}>
      {renderedCells}
    </BoardSurface>
  )
}
