import { Box, styled } from '@mui/material'
import { useCallback } from 'react'
import { CellType, coordsToCellKey, MineCounterValue } from 'src/core/game'
import {
  CellBoxProps,
  MineCounterDisplayProps,
  MineFieldBoardGridCellProps,
  MuiPaletteSection,
  NonRevealedCellProps,
} from 'src/features/minefield/types/MineFieldBoardGridCellTypes'
import { minefieldUI } from 'src/shared/constants'
import { useGameStore } from 'src/shared/store'
import { shouldForwardPropWithBlackList } from 'src/shared/utils'
import { useShallow } from 'zustand/shallow'
import { FlagWithAnimation } from './FlagWithAnimation'
import { useCellLongPress } from './hooks/useCellLongPress'
import { createHandleRevealCell } from './reveal-handler/createHandleRevealCell'

const COUNTER_COLORS = {
  1: 'primary',
  2: 'success',
  3: 'error',
  4: 'secondary',
  5: 'warning',
  6: 'info',
  7: 'secondary',
  8: 'error',
} as const satisfies Record<MineCounterValue, MuiPaletteSection>

const CellBox = styled(Box, {
  shouldForwardProp: shouldForwardPropWithBlackList(['isRevealed', 'isExploded']),
})<CellBoxProps>(({ theme, isRevealed, isExploded }) => {
  const greyColor = theme.palette.grey
  const isDark = theme.palette.mode === 'dark'
  let backgroundColor

  if (isExploded) backgroundColor = theme.palette.error.main
  else if (isRevealed) backgroundColor = isDark ? greyColor[700] : greyColor[300]
  else backgroundColor = isDark ? greyColor[800] : greyColor[500]

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: minefieldUI.cellSize,
    height: minefieldUI.cellSize,
    userSelect: 'none',
    boxShadow: `
      inset 0 2px 0 rgba(255,255,255,0.15),
      inset 0 -2px 0 rgba(0,0,0,0.6),
      inset 2px 0 0 rgba(255,255,255,0.15),
      inset -2px 0 0 rgba(0,0,0,0.6)
    `,
    backgroundColor,
  }
})

const ClickableBoxWrapper = styled(Box)({
  cursor: 'pointer',
})

const NonRevealedCell = ({ onClick, onContextMenu, longPressHandlers, isFlagged }: NonRevealedCellProps) => {
  return (
    <ClickableBoxWrapper role="button" onClick={onClick} onContextMenu={onContextMenu} {...longPressHandlers}>
      <CellBox isRevealed={false}>
        <FlagWithAnimation visible={isFlagged} />
      </CellBox>
    </ClickableBoxWrapper>
  )
}

const MineDisplay = styled(Box)(({ theme }) => {
  const textShadowColor = theme.palette.grey[900]

  return {
    fontSize: '1.825rem',
    color: 'inherit',
    textShadow: `0px 1px 1px ${textShadowColor}`,
  }
})

const MineCounterDisplay = styled(Box, { shouldForwardProp: shouldForwardPropWithBlackList(['value']) })<MineCounterDisplayProps>(({
  theme,
  value,
}) => {
  const fontColorShade = theme.palette.mode === 'dark' ? 'light' : 'dark'
  const fontColor = value && COUNTER_COLORS[value] ? theme.palette[COUNTER_COLORS[value]][fontColorShade] : theme.palette.text.primary
  const textShadowColor = theme.palette.grey[900]

  return {
    fontSize: '2.25rem',
    fontWeight: 700,
    color: fontColor,
    textShadow: `0px 1px 1px ${textShadowColor}`,
  }
})

export default function MineFieldBoardGridCell({ rowIndex, colIndex }: MineFieldBoardGridCellProps) {
  const cellKey = coordsToCellKey(rowIndex, colIndex)

  const { cellState, toggleFlagCell } = useGameStore(
    useShallow((s) => ({
      cellState: s.cells[cellKey],
      toggleFlagCell: s.toggleFlagCell,
    }))
  )

  const cellType = cellState?.type
  const isMine = cellType === CellType.MINE
  const isMineCounter = cellType === CellType.MINE_COUNTER
  const isRevealed = Boolean(cellState?.isRevealed)
  const isFlagged = Boolean(cellState?.isFlagged)
  const isExploded = isMine && Boolean(cellState?.isExploded)
  const counterValue = isMineCounter ? cellState.value : null

  const longPressHandlers = useCellLongPress(() => toggleFlagCell(cellKey), 200)

  const handleRevealCell = useCallback(createHandleRevealCell({ cellKey, cellType, isFlagged }), [cellKey, cellType, isFlagged])

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      toggleFlagCell(cellKey)
    },
    [cellKey, toggleFlagCell]
  )

  const preventContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  if (!isRevealed) {
    return (
      <NonRevealedCell
        isFlagged={isFlagged}
        onClick={handleRevealCell}
        onContextMenu={handleContextMenu}
        longPressHandlers={longPressHandlers}
      />
    )
  }

  return (
    <CellBox isRevealed={isRevealed} isExploded={isExploded} onContextMenu={preventContextMenu}>
      {isMine && <MineDisplay>💣</MineDisplay>}
      {isMineCounter && <MineCounterDisplay value={counterValue}>{counterValue}</MineCounterDisplay>}
    </CellBox>
  )
}
