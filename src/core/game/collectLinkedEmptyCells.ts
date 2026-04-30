import { cellKeyToCoords, coordsToCellKey, NEIGHBOR_OFFSETS } from './generateMinefield'
import { CellKey, CellType, MinefieldRecord } from './types/types'

const isInside = (r: number, c: number, rows: number, cols: number) => r >= 0 && r < rows && c >= 0 && c < cols

export const collectLinkedEmptyCells = (startKey: CellKey, minefield: MinefieldRecord, rowCount: number, colCount: number): CellKey[] => {
  const result: CellKey[] = []
  const visited = new Set<CellKey>()
  const queue: CellKey[] = [startKey]

  while (queue.length > 0) {
    const key = queue.shift()!
    if (visited.has(key)) continue

    visited.add(key)
    result.push(key)

    const cell = minefield[key]

    if (cell.type !== CellType.EMPTY) continue

    const [row, col] = cellKeyToCoords(key)

    for (const [dr, dc] of NEIGHBOR_OFFSETS) {
      const nr = row + dr
      const nc = col + dc

      if (!isInside(nr, nc, rowCount, colCount)) continue

      const neighborKey = coordsToCellKey(nr, nc)
      const neighborCell = minefield[neighborKey]

      if (visited.has(neighborKey)) continue
      if (neighborCell.type === CellType.MINE) continue

      queue.push(neighborKey)
    }
  }

  return result
}
