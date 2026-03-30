import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Button, Slider, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { minefieldLimits } from 'src/shared/constants'
import { useGameStore, useModalStore } from 'src/shared/store'
import { SliderConfig } from '../types/GameSettingsIconButtonTypes'
import { calculateMaxMine } from './calculateMaxMine'

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

export const SettingsBox = () => {
  const game = useGameStore.getState()
  const modal = useModalStore.getState()

  const [rows, setRows] = useState<number>(game.rowCount)
  const [cols, setCols] = useState<number>(game.colCount)
  const [mines, setMines] = useState<number>(game.totalMines)

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
    game.applyGameConfig({ rowCount: rows, colCount: cols, totalMines: mines })
    game.startNewGame()
    modal.closeModal()
  }, [rows, cols, mines])

  return (
    <Stack p={2} minHeight={300} spacing={8} alignItems="center">
      <Stack direction="row" spacing={6}>
        <VerticalSlider
          value={rows}
          label="Rows"
          min={minefieldLimits.dimensions.rows.min}
          max={minefieldLimits.dimensions.rows.max}
          onChange={handleChangeRows}
        />
        <VerticalSlider
          value={cols}
          label="Cols"
          min={minefieldLimits.dimensions.cols.min}
          max={minefieldLimits.dimensions.cols.max}
          onChange={handleChangeCols}
        />
        <VerticalSlider value={mines} label="Mines" min={minefieldLimits.mines.count.min} max={maxMines} onChange={handleChangeMines} />
      </Stack>
      <Stack direction="row" spacing={1} maxHeight={40}>
        <Button variant="contained" color="error" onClick={modal.closeModal}>
          <CloseRoundedIcon fontSize="large" />
        </Button>
        <Button variant="contained" color="primary" size="large" sx={{ fontSize: 22 }} onClick={handlePlay}>
          Start
        </Button>
      </Stack>
    </Stack>
  )
}
