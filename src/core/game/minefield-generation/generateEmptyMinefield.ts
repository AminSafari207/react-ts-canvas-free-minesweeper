import { buildCell } from '../buildCell'
import { CellKey, CellType, MinefieldRecord } from '../types/types'

export const generateEmptyMinefield = (totalRows: number, totalColumns: number): MinefieldRecord => {
  const minefield: MinefieldRecord = {}

  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalColumns; col++) {
      const key: CellKey = `${row}_${col}`
      minefield[key] = buildCell({ type: CellType.EMPTY })
    }
  }

  return minefield
}
