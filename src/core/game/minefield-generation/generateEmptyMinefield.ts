import { buildEmptyCell } from '../buildCell'
import { CellKey, MinefieldRecord } from '../types/types'

export const generateEmptyMinefield = (rowCount: number, colCount: number): MinefieldRecord => {
  const minefield: MinefieldRecord = {}

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const key: CellKey = `${row}_${col}`
      minefield[key] = buildEmptyCell()
    }
  }

  return minefield
}
