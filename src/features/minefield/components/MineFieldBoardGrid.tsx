import { styled } from '@mui/material'
import { JSX, useMemo } from 'react'
import { GameStatus } from 'src/core/game'
import { BoardSurfaceProps, MineFieldBoardGridProps } from 'src/features/minefield/types/MineFieldBoardGridTypes'
import { GlassyPaper } from 'src/shared/paper'
import { shouldForwardPropWithBlackList } from 'src/shared/utils'
import MineFieldBoardGridCell from './MineFieldBoardGridCell'

const BoardSurface = styled(GlassyPaper, {
  shouldForwardProp: shouldForwardPropWithBlackList(['colCount', 'gameStatus']),
})<BoardSurfaceProps>(({ theme, colCount, gameStatus }) => {
  const isPlaying = gameStatus === GameStatus.PLAYING
  const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]

  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${colCount}, auto)`,
    padding: 0,
    minWidth: 'fit-content',
    overflow: 'hidden',
    pointerEvents: isPlaying ? 'auto' : 'none',
    border: `0.75rem ridge ${borderColor}`,
  }
})

export default function MineFieldBoardGrid({ rowCount, colCount, gameStatus }: MineFieldBoardGridProps) {
  const renderCells: JSX.Element[] = useMemo(() => {
    return Array.from({ length: rowCount * colCount }, (_, i) => {
      const rowIndex = Math.floor(i / colCount)
      const colIndex = i % colCount

      return <MineFieldBoardGridCell key={`board-grid-cell-${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} />
    })
  }, [rowCount, colCount])

  return (
    <BoardSurface colCount={colCount} gameStatus={gameStatus} onContextMenu={(e) => e.preventDefault()}>
      {renderCells}
    </BoardSurface>
  )
}
