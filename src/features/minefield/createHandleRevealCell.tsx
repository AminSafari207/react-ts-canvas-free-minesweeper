import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { Button, Divider, IconButton, Typography } from '@mui/material'
import { CellKey, CellType, collectLinkedEmptyCells, GameStatus } from 'src/core/game'
import { useMineFieldCellStore, useMineFieldMetaDataStore, useModalStore } from 'src/shared/store'
import { useTimerStore } from 'src/shared/store/timerSlice'
import { CellClickHandler, CreateHandleRevealCell, CreateHandleRevealCellParams } from './types/createHandleRevealCellTypes'

const { revealCell, revealMultipleCells, explodeMine, hasWon } = useMineFieldCellStore.getState()
const { startNewGame, updateMetaData } = useMineFieldMetaDataStore.getState()
const { showSimpleModal, closeModal } = useModalStore.getState()
const { stopTimer } = useTimerStore.getState()

const handleRestartClick = () => {
  startNewGame()
  closeModal()
}

export const createHandleRevealCell: CreateHandleRevealCell = ({
  cellKey,
  cellType,
  isFlagged,
}: CreateHandleRevealCellParams): CellClickHandler => {
  return (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const gameStatus = useMineFieldMetaDataStore.getState().gameStatus

    if (isFlagged || gameStatus !== GameStatus.PLAYING) return

    if (cellType === CellType.MINE) {
      const { randomMineCellKeys } = useMineFieldCellStore.getState()

      explodeMine(cellKey)
      revealMultipleCells(randomMineCellKeys)
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
      revealCell(cellKey)
    }

    if (cellType === CellType.EMPTY) {
      const { rowCount, colCount } = useMineFieldMetaDataStore.getState()
      const mineField = useMineFieldCellStore.getState().cells
      const collectedLinkedEmptyCells: CellKey[] = collectLinkedEmptyCells(cellKey, mineField, rowCount, colCount)

      revealMultipleCells(collectedLinkedEmptyCells)
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
  }
}
