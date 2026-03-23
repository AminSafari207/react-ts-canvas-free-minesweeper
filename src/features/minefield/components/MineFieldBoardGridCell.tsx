import { Box, IconButton, styled, Typography } from '@mui/material'
import { memo, useCallback, useMemo } from 'react'
import { CellType, coordsToCellKey } from 'src/core/game'
import { useMineFieldCellStore } from 'src/shared/store'
import { createHandleRevealCell } from './createHandleRevealCell'
import { FlagWithAnimation } from './FlagWithAnimation'
import {
  CellBoxProps,
  MineCounterCellComponentProps,
  MineFieldBoardGridCellProps,
  NonRevealedCellProps,
} from './types/MineFieldBoardGridCellTypes'
import { useCellLongPress } from './useCellLongPress'

const { toggleFlagCell } = useMineFieldCellStore.getState()

const CellBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExploded',
})<CellBoxProps>(({ theme, isExploded }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 50,
  height: 50,
  border: '2px solid #272727ff',
  backgroundColor: isExploded ? theme.palette.error.main : theme.palette.mode === 'dark' ? '#616161ff' : '#c9c9c9ff',
  userReveal: 'none',
}))

const NonRevealedCell = memo(({ onClick, onContextMenu, longPressHandlers, isFlagged }: NonRevealedCellProps) => {
  return (
    <IconButton
      disableRipple
      disableFocusRipple
      disableTouchRipple
      sx={{ p: 0, color: 'inherit' }}
      onClick={onClick}
      onContextMenu={onContextMenu}
      {...longPressHandlers}
    >
      <CellBox sx={(theme) => ({ bgcolor: theme.palette.mode === 'dark' ? '#464646ff' : '#939393ff' })}>
        <FlagWithAnimation visible={isFlagged} />
      </CellBox>
    </IconButton>
  )
})

const MineCellComponent = () => (
  <Typography
    sx={{
      fontSize: '1.75rem',
      color: 'inherit',
      textShadow: '0px 1px 1px #272727ff',
    }}
  >
    💣
  </Typography>
)

const MineCounterCellComponent = ({ counterValue, counterColor }: MineCounterCellComponentProps) => (
  <Typography
    sx={{
      fontSize: '2.125rem',
      fontWeight: 700,
      color: counterColor,
      textShadow: '0px 1px 1px #383838ff',
    }}
  >
    {counterValue}
  </Typography>
)

export default function MineFieldBoardGridCell({ rowIndex, colIndex, getMineCounterColor }: MineFieldBoardGridCellProps) {
  const cellKey = coordsToCellKey(rowIndex, colIndex)

  const cellState = useMineFieldCellStore((s) => s.cells[cellKey])

  const cellType = cellState?.type
  const isMine = cellType === CellType.MINE
  const isMineCounter = cellType === CellType.MINE_COUNTER
  const isRevealed = Boolean(cellState?.isRevealed)
  const isFlagged = Boolean(cellState?.isFlagged)
  const isExploded = isMine && Boolean(cellState?.isExploded)
  const counterValue = isMineCounter ? cellState.value : null

  const longPressHandlers = useCellLongPress(() => toggleFlagCell(cellKey), 200)

  const handleRevealCell = useMemo(() => createHandleRevealCell({ cellKey, cellType, isFlagged }), [cellKey, cellType, isFlagged])

  const handleContextMenu = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleFlagCell(cellKey)
  }, [])

  if (!isRevealed) {
    return (
      <NonRevealedCell
        onClick={handleRevealCell}
        onContextMenu={handleContextMenu}
        longPressHandlers={longPressHandlers}
        isFlagged={isFlagged}
      />
    )
  }

  return (
    <CellBox key={colIndex} isExploded={isExploded} onContextMenu={(e) => e.preventDefault()}>
      {isMine && <MineCellComponent />}
      {isMineCounter && <MineCounterCellComponent counterValue={counterValue} counterColor={getMineCounterColor(counterValue)} />}
    </CellBox>
  )
}
