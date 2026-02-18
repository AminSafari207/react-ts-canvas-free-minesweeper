import { alpha, Stack, useTheme } from '@mui/material'
import { JSX, PropsWithChildren, useCallback, useMemo } from 'react'
import { GameStatus, MineCounterValue } from 'src/core/game'
import { GlassyPaper } from 'src/shared/paper'
import MineFieldBoardGridCell from './MineFieldBoardGridCell'
import { GetMineCounterColor } from './types/MineFieldBoardGridCellTypes'
import { MineFieldBoardGridProps } from './types/MineFieldBoardGridTypes'

const RowWrapper = ({ children }: PropsWithChildren) => {
  return <Stack direction="row">{children}</Stack>
}

export default function MineFieldBoardGrid({ rowCount, colCount, gameStatus }: MineFieldBoardGridProps) {
  const theme = useTheme()

  const mode = theme.palette.mode === 'dark' ? 'light' : 'dark'

  const mineCounterColorMap = useMemo<Record<MineCounterValue, string>>(
    () => ({
      1: theme.palette.primary[mode],
      2: theme.palette.success[mode],
      3: theme.palette.error[mode],
      4: theme.palette.secondary[mode],
      5: theme.palette.warning[mode],
      6: theme.palette.info[mode],
      7: theme.palette.secondary[mode],
      8: theme.palette.error[mode],
    }),
    [mode]
  )

  const getMineCounterColor: GetMineCounterColor = useCallback(
    (value) => {
      if (value === null) return theme.palette.text.primary
      return mineCounterColorMap[value] ?? theme.palette.text.primary
    },
    [mineCounterColorMap]
  )

  const renderRows: JSX.Element[] = useMemo(() => {
    const rows: JSX.Element[] = []

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const cells: JSX.Element[] = []

      for (let colIndex = 0; colIndex < colCount; colIndex++) {
        cells.push(
          <MineFieldBoardGridCell
            key={`board-grid-cell-${rowIndex}-${colIndex}`}
            rowIndex={rowIndex}
            colIndex={colIndex}
            getMineCounterColor={getMineCounterColor}
          />
        )
      }

      rows.push(<RowWrapper key={`board-grid-row-${rowIndex}`}>{cells}</RowWrapper>)
    }

    return rows
  }, [rowCount, colCount, mode])

  return (
    <GlassyPaper
      sx={(theme) => ({
        minWidth: 'fit-content',
        p: 0,
        overflow: 'hidden',
        bgcolor: theme.palette.mode === 'dark' ? '#525252ff' : '#aeaeaeff',
        pointerEvents: gameStatus !== GameStatus.PLAYING ? 'none' : 'auto',
        border: `0.75rem ridge ${alpha(mode === 'dark' ? '#585858ff' : '#6f6f6fff', 0.9)}`,
      })}
      onContextMenu={(e) => e.preventDefault()}
    >
      {renderRows}
    </GlassyPaper>
  )
}
