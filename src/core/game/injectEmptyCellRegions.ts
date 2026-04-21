import { minefieldLimits } from 'src/shared/constants'
import { createBitmap } from 'src/shared/utils'
import { coordsToCellKey, NEIGHBOR_OFFSETS } from './generateMineField'
import { EmptyRegion, EmptyRegions } from './types/injectEmptyCellRegionsTypes'
import { CellKey, CellType, MineFieldRecord } from './types/types'

const DEFAULT_EMPTY_REGION_STATE: Pick<EmptyRegion, 'isRevealed'> = {
  isRevealed: false,
}

const MAX_ROWS = minefieldLimits.dimensions.rows.max
const MAX_COLS = minefieldLimits.dimensions.cols.max
const MAX_CELLS = MAX_ROWS * MAX_COLS

const visited = createBitmap(MAX_CELLS)
const seenInRegion = createBitmap(MAX_CELLS)

const gridToIndex = (row: number, col: number, cols: number) => row * cols + col

const isInside = (rowIndex: number, columnIndex: number, totalRows: number, totalCols: number) => {
  return rowIndex >= 0 && rowIndex < totalRows && columnIndex >= 0 && columnIndex < totalCols
}

export const injectEmptyCellRegions = (totalRows: number, totalCols: number, minefield: MineFieldRecord): EmptyRegions => {
  const emptyRegions: EmptyRegions = []
  const queue: number[] = []

  let regionId = 0

  visited.clear()
  seenInRegion.clear()

  for (let r = 0; r < totalRows; r++) {
    for (let c = 0; c < totalCols; c++) {
      const startIndex = gridToIndex(r, c, totalCols)

      if (visited.has(startIndex)) continue

      const startKey = coordsToCellKey(r, c)
      const startCell = minefield[startKey]

      if (startCell.type !== CellType.EMPTY) continue

      queue.length = 0
      queue.push(startIndex)
      let qi = 0

      const members: CellKey[] = []
      const borderCounters: CellKey[] = []

      seenInRegion.clear()

      while (qi < queue.length) {
        const cellIndex = queue[qi++]

        if (visited.has(cellIndex)) continue

        visited.set(cellIndex, 1)

        const row = Math.floor(cellIndex / totalCols)
        const col = cellIndex % totalCols
        const cellKey = coordsToCellKey(row, col)
        const cell = minefield[cellKey]

        if (cell.type !== CellType.EMPTY) continue

        members.push(cellKey)
        seenInRegion.set(cellIndex, 1)
        cell.regionId = regionId

        for (const [dr, dc] of NEIGHBOR_OFFSETS) {
          const nRow = row + dr
          const nCol = col + dc

          if (!isInside(nRow, nCol, totalRows, totalCols)) continue

          const nIndex = gridToIndex(nRow, nCol, totalCols)
          const nKey = coordsToCellKey(nRow, nCol)
          const nCell = minefield[nKey]

          if (nCell.type === CellType.EMPTY) {
            if (!visited.has(nIndex)) {
              queue.push(nIndex)
            }
          }

          if (nCell.type === CellType.MINE_COUNTER) {
            if (!seenInRegion.has(nIndex)) {
              seenInRegion.set(nIndex, 1)
              borderCounters.push(nKey)
            }
          }
        }
      }

      emptyRegions[regionId++] = { ...DEFAULT_EMPTY_REGION_STATE, members, borderCounters }
    }
  }

  return emptyRegions
}
