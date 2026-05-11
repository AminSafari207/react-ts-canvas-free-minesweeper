import { styled } from '@mui/material'
import { JSX, useMemo } from 'react'
import { GameStatus } from 'src/core/game'
import { BoardSurfaceProps, MinefieldBoardGridProps } from 'src/features/minefield/types/MinefieldBoardGridTypes'
import { GlassyPaper } from 'src/shared/paper'
import { shouldForwardPropWithBlackList } from 'src/shared/utils'
import MinefieldBoardGridCell from './MinefieldBoardGridCell'

const BoardSurface = styled(GlassyPaper, {
  shouldForwardProp: shouldForwardPropWithBlackList(['totalColumns', 'gameStatus']),
})<BoardSurfaceProps>(({ theme, totalColumns, gameStatus }) => {
  const isPlaying = gameStatus === GameStatus.PLAYING
  const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]

  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${totalColumns}, auto)`,
    padding: 0,
    minWidth: 'fit-content',
    overflow: 'hidden',
    pointerEvents: isPlaying ? 'auto' : 'none',
    border: `0.75rem ridge ${borderColor}`,
  }
})

export default function MinefieldBoardGrid({ totalRows, totalColumns, gameStatus }: MinefieldBoardGridProps) {
  const renderCells: JSX.Element[] = useMemo(() => {
    return Array.from({ length: totalRows * totalColumns }, (_, i) => {
      const rowIndex = Math.floor(i / totalColumns)
      const colIndex = i % totalColumns

      return <MinefieldBoardGridCell key={`board-grid-cell-${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} />
    })
  }, [totalRows, totalColumns])

  return (
    <BoardSurface totalColumns={totalColumns} gameStatus={gameStatus} onContextMenu={(e) => e.preventDefault()}>
      {renderCells}
    </BoardSurface>
  )
}
