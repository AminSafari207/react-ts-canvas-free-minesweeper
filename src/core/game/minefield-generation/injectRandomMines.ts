import { shuffleArray } from 'src/shared/utils'
import { buildCell } from '../buildCell'
import { coordsToCellKey } from '../cellCordinates'
import { CellCoordinates, CellKey, CellType, MinefieldRecord } from '../types/types'

export const injectRandomMines = (totalRows: number, totalColumns: number, totalMines: number, minefield: MinefieldRecord): CellKey[] => {
  const totalCells = totalRows * totalColumns

  if (totalMines < 1 || totalMines >= totalCells) {
    throw new Error("'injectRandomMines': totalMines must be higher than 0 and lower than totalCells")
  }

  const allCoordinates: CellCoordinates[] = []

  for (let r = 0; r < totalRows; r++) {
    for (let c = 0; c < totalColumns; c++) {
      allCoordinates.push([r, c])
    }
  }

  const shuffledCoordinates = shuffleArray(allCoordinates)
  const shuffledCellKeys: CellKey[] = []

  for (let i = 0; i < totalMines; i++) {
    const cellKey = coordsToCellKey(...shuffledCoordinates[i])
    minefield[cellKey] = buildCell({ type: CellType.MINE })
    shuffledCellKeys.push(cellKey)
  }

  return shuffledCellKeys
}
