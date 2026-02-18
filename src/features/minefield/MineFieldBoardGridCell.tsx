import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { Box, Button, Divider, IconButton, styled, Typography } from '@mui/material'
import { memo, useCallback } from 'react'
import { CellKey, CellType, collectLinkedEmptyCells, coordsToCellKey, GameStatus } from 'src/core/game'
import { useMineFieldCellStore, useMineFieldMetaDataStore, useModalStore } from 'src/shared/store'
import { useTimerStore } from 'src/shared/store/useTimerStore'
import { FlagWithAnimation } from './FlagWithAnimation'
import {
  CellBoxProps,
  MineCounterCellComponentProps,
  MineFieldBoardGridCellProps,
  NonSelectedCellProps,
} from './types/MineFieldBoardGridCellTypes'
import { useCellLongPress } from './useCellLongPress'

const { selectCell, selectMultipleCells, toggleFlagCell, explodeMine } = useMineFieldCellStore.getState()
const { startNewGame, updateMetaData, hasWon } = useMineFieldMetaDataStore.getState()
const { showSimpleModal, closeModal } = useModalStore.getState()
const { stopTimer } = useTimerStore.getState()

const handleRestartClick = () => {
  startNewGame()
  closeModal()
}

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
  userSelect: 'none',
}))

const NonSelectedCell = memo(({ onClick, onContextMenu, longPressHandlers, isFlagged }: NonSelectedCellProps) => {
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
  const isSelected = Boolean(cellState?.isSelected)
  const isFlagged = Boolean(cellState?.isFlagged)
  const isExploded = isMine && Boolean(cellState?.isExploded)
  const counterValue = isMineCounter ? cellState.value : null

  const longPressHandlers = useCellLongPress(() => toggleFlagCell(cellKey), 200)

  const handleSelectCell = useCallback(() => {
    const gameStatus = useMineFieldMetaDataStore.getState().gameStatus

    if (isFlagged || gameStatus !== GameStatus.PLAYING) return

    if (cellType === CellType.MINE) {
      const { randomMineCellKeys } = useMineFieldCellStore.getState()

      explodeMine(cellKey)
      selectMultipleCells(randomMineCellKeys)
      stopTimer()
      updateMetaData({ gameStatus: GameStatus.LOSE })
      showSimpleModal({
        title: 'BOOM!',
        content: <Typography textAlign="center">Mine has been exploded!</Typography>,
        actions: (
          <>
            <Button variant="contained" onClick={handleRestartClick}>
              Play Again
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem />
            <IconButton disableRipple disableFocusRipple disableTouchRipple onClick={closeModal} color="secondary" sx={{ p: 0 }}>
              <VisibilityRoundedIcon fontSize="large" />
            </IconButton>
          </>
        ),
        DialogTitleProps: {
          variant: 'h3',
          textAlign: 'center',
          color: 'error',
        },
        DialogActionsProps: {
          sx: { mx: 'auto' },
        },
      })

      return
    }

    if (cellType === CellType.MINE_COUNTER) {
      selectCell(cellKey)
    }

    if (cellType === CellType.EMPTY) {
      const { rowCount, colCount } = useMineFieldMetaDataStore.getState()
      const mineField = useMineFieldCellStore.getState().cells
      const collectedLinkedEmptyCells: CellKey[] = collectLinkedEmptyCells(cellKey, mineField, rowCount, colCount)

      selectMultipleCells(collectedLinkedEmptyCells)
    }

    if (hasWon()) {
      stopTimer()
      updateMetaData({ gameStatus: GameStatus.WIN })
      showSimpleModal({
        title: 'Victory!',
        content: <Typography textAlign="center">You've found all of the mines!</Typography>,
        actions: (
          <Button variant="contained" onClick={handleRestartClick}>
            Play Again
          </Button>
        ),
        DialogTitleProps: {
          variant: 'h3',
          textAlign: 'center',
          color: 'success',
        },
        DialogActionsProps: {
          sx: { mx: 'auto' },
        },
      })
    }
  }, [isFlagged])

  const handleContextMenu = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleFlagCell(cellKey)
  }, [])

  if (!isSelected) {
    return (
      <NonSelectedCell
        onClick={handleSelectCell}
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
