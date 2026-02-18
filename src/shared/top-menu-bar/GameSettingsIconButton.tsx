import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SettingsRounded from '@mui/icons-material/SettingsRounded'
import { Button, IconButton, Slider, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMineFieldMetaDataStore, useModalStore } from 'src/shared/store'
import { SliderConfig } from './types/GameSettingsIconButtonTypes'

const { updateMetaData, startNewGame } = useMineFieldMetaDataStore.getState()
const { showCustomModal, closeModal } = useModalStore.getState()

const MIN_ROWS = 9
const MIN_COLS = 9
const MIN_MINES = 10
const MAX_ROWS = 30
const MAX_COLS = 30

const calculateMaxMine = (rows: number, cols: number): number => Math.floor(((cols * rows) / 10) * 3)

const VerticalSlider = ({ value, label, min, max, onChange }: SliderConfig) => (
  <Stack spacing={2} alignItems="center" flex={1}>
    <Typography textAlign="center" color="primary" variant="h3">
      {value}
    </Typography>
    <Typography textAlign="center" color="primary" variant="h4">
      {label}
    </Typography>
    <Slider min={min} max={max} value={value} orientation="vertical" color="primary" sx={{ minHeight: 250 }} onChange={onChange} />
  </Stack>
)

const SettingsBox = () => {
  const { rowCount, colCount, totalMines } = useMineFieldMetaDataStore.getState()

  const [rows, setRows] = useState<number>(rowCount)
  const [cols, setCols] = useState<number>(colCount)
  const [mines, setMines] = useState<number>(totalMines)

  const maxMines = useMemo(() => calculateMaxMine(rows, cols), [rows, cols])

  const handleChangeRows = useCallback((_: Event, value: number) => {
    setRows(value)
  }, [])

  const handleChangeCols = useCallback((_: Event, value: number) => {
    setCols(value)
  }, [])

  const handleChangeMines = useCallback((_: Event, value: number) => {
    setMines(value)
  }, [])

  useEffect(() => {
    if (mines > maxMines) {
      setMines(maxMines)
    }
  }, [maxMines])

  const handlePlay = useCallback(() => {
    updateMetaData({ rowCount: rows, colCount: cols, totalMines: mines })
    startNewGame()
    closeModal()
  }, [rows, cols, mines])

  return (
    <Stack p={2} minHeight={300} spacing={8} alignItems="center">
      <Stack direction="row" spacing={6}>
        <VerticalSlider value={rows} label="Rows" min={MIN_ROWS} max={MAX_ROWS} onChange={handleChangeRows} />
        <VerticalSlider value={cols} label="Cols" min={MIN_COLS} max={MAX_COLS} onChange={handleChangeCols} />
        <VerticalSlider value={mines} label="Mines" min={MIN_MINES} max={maxMines} onChange={handleChangeMines} />
      </Stack>

      <Stack direction="row" spacing={1} maxHeight={40}>
        <Button variant="contained" color="error" onClick={closeModal}>
          <CloseRoundedIcon fontSize="large" />
        </Button>
        <Button variant="contained" color="primary" size="large" sx={{ fontSize: 22 }} onClick={handlePlay}>
          Start
        </Button>
      </Stack>
    </Stack>
  )
}

export default function GameSettingsIconButton() {
  const handleOnClick = useCallback(() => {
    showCustomModal({
      render: SettingsBox,
    })
  }, [])

  return (
    <IconButton disableFocusRipple disableRipple disableTouchRipple size="small" sx={{ p: 0 }} onClick={handleOnClick}>
      <SettingsRounded sx={{ fontSize: 32 }} />
    </IconButton>
  )
}
