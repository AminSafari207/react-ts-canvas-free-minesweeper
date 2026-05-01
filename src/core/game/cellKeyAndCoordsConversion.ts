import { CellCoordinates, CellKey } from './types/types'

export const cellKeyToCoords = (key: CellKey): CellCoordinates => {
  const [rowStr, colStr] = key.split('_')
  const row = parseInt(rowStr, 10)
  const col = parseInt(colStr, 10)

  return [row, col]
}

export const coordsToCellKey = (row: number, col: number): CellKey => {
  return `${row}_${col}`
}
