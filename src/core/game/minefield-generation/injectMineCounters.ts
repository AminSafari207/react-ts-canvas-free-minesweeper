import { buildCell } from '../buildCell'
import { coordsToCellKey } from '../cellKeyAndCoordsConversion'
import { NEIGHBOR_OFFSETS } from '../gridNeighbor'
import { CellType, MineCounterValue, MinefieldRecord } from '../types/types'

const isMineCounterValue = (value: number): value is MineCounterValue => {
  return value >= 1 && value <= 8
}

export const injectMineCounters = (rowCount: number, colCount: number, minefield: MinefieldRecord): void => {
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const cellKey = coordsToCellKey(row, col)

      if (minefield[cellKey]['type'] !== CellType.MINE) {
        let neighborMineCount: MineCounterValue | 0 = 0

        for (const [dr, dc] of NEIGHBOR_OFFSETS) {
          const nr = row + dr
          const nc = col + dc

          if (nr >= 0 && nr < rowCount && nc >= 0 && nc < colCount) {
            const neighborCellKey = coordsToCellKey(nr, nc)

            if (minefield[neighborCellKey]['type'] === CellType.MINE) {
              neighborMineCount++
            }
          }
        }

        if (isMineCounterValue(neighborMineCount)) {
          minefield[cellKey] = buildCell({ type: CellType.MINE_COUNTER, value: neighborMineCount })
        }
      }
    }
  }
}
