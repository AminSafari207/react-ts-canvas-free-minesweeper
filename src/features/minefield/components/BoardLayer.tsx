import { styled } from '@mui/material'
import { useEffect } from 'react'
import { GameStatus } from 'src/core/game'
import { BoardSurfaceProps, MinefieldBoardGridProps } from 'src/features/minefield/components/types/MinefieldBoardGridTypes'
import { minefieldConfig } from 'src/shared/constants'
import { GlassyPaper } from 'src/shared/paper'
import { shouldForwardPropWithBlackList } from 'src/shared/utils'
import MinefieldBoardGridCell from './MinefieldBoardGridCell'
import { useChunkedCells } from './hooks/useChunkedCells'

type BoardLayerProps = MinefieldBoardGridProps & {
  sessionId: number
  mode: 'visible' | 'staged'
  onReady?: () => void
}

const CELL_SIZE = minefieldConfig.ui.cellSize
const BOARD_BORDER_LINE_WIDTH_PX = 16

const BoardSurface = styled(GlassyPaper, {
  shouldForwardProp: shouldForwardPropWithBlackList(['totalRows', 'totalColumns', 'gameStatus', 'isFullyMounted']),
})<BoardSurfaceProps>(({ theme, totalRows, totalColumns, gameStatus, isFullyMounted }) => {
  const isPlaying = gameStatus === GameStatus.PLAYING
  const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]
  const borderLengthOffset = BOARD_BORDER_LINE_WIDTH_PX * 2

  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${totalColumns}, ${CELL_SIZE}px)`,
    minWidth: CELL_SIZE * totalColumns + borderLengthOffset,
    minHeight: CELL_SIZE * totalRows + borderLengthOffset,
    padding: 0,
    border: `${BOARD_BORDER_LINE_WIDTH_PX}px ridge ${borderColor}`,
    overflow: 'visible',
    pointerEvents: isPlaying ? 'auto' : 'none',
    contentVisibility: isFullyMounted ? 'visible' : 'hidden',
  }
})

export const BoardLayer = ({ totalRows, totalColumns, gameStatus, cellStyles, mode, onReady }: BoardLayerProps) => {
  const shouldChunkRender = mode === 'staged'

  const { visibleCells, isFullyMounted } = useChunkedCells({
    totalRows,
    totalColumns,
    enabled: shouldChunkRender,
  })

  useEffect(() => {
    if (mode === 'staged' && isFullyMounted) {
      onReady?.()
    }
  }, [mode, isFullyMounted, onReady])

  return (
    <BoardSurface
      totalRows={totalRows}
      totalColumns={totalColumns}
      gameStatus={gameStatus}
      isFullyMounted={isFullyMounted}
      style={
        mode === 'staged'
          ? {
              position: 'absolute',
              inset: 0,
              visibility: 'hidden',
              pointerEvents: 'none',
            }
          : undefined
      }
    >
      {visibleCells.map(([rowIndex, colIndex]) => (
        <MinefieldBoardGridCell key={`cell-${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} cellStyles={cellStyles} />
      ))}
    </BoardSurface>
  )
}
