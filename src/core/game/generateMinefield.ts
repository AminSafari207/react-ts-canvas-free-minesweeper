import { buildEmptyCell, buildMineCell, buildMineCounterCell } from './buildCell'
import { injectEmptyCellRegions } from './injectEmptyCellRegions'
import { GeneratedMinefieldRecord } from './types/generateMinefieldTypes'
import { CellKey, CellType, MineCounterValue, MinefieldRecord } from './types/types'

// prettier-ignore
export const NEIGHBOR_OFFSETS = [
  [-1, -1], [-1, 0],  [-1, 1],
  [0, -1],            [0, 1],
  [1, -1],  [1, 0],   [1, 1],
]

export const cellKeyToCoords = (key: CellKey): [number, number] => {
  const [rowStr, colStr] = key.split('_')
  const row = parseInt(rowStr, 10)
  const col = parseInt(colStr, 10)

  return [row, col]
}

export const coordsToCellKey = (row: number, col: number): CellKey => {
  return `${row}_${col}`
}

const generateEmptyMinefield = (rowCount: number, colCount: number): MinefieldRecord => {
  const minefield: MinefieldRecord = {}

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const key: CellKey = `${row}_${col}`
      minefield[key] = buildEmptyCell()
    }
  }

  return minefield
}

const shuffleArray = <T>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

const injectRandomMines = (rowCount: number, colCount: number, totalMines: number, minefield: MinefieldRecord): CellKey[] => {
  const totalCells = rowCount * colCount

  if (totalMines < 1 || totalMines >= totalCells) {
    throw new Error("'injectRandomMines': totalMines must be higher than 0 and lower than totalCells")
  }

  const allCoordinates: [number, number][] = []

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      allCoordinates.push([r, c])
    }
  }

  const shuffledCoordinates = shuffleArray(allCoordinates)
  const shuffledCellKeys: CellKey[] = []

  for (let i = 0; i < totalMines; i++) {
    const cellKey = coordsToCellKey(...shuffledCoordinates[i])
    minefield[cellKey] = buildMineCell()
    shuffledCellKeys.push(cellKey)
  }

  return shuffledCellKeys
}

const isMineCounterValue = (value: number): value is MineCounterValue => {
  return value >= 1 && value <= 8
}

const injectMineCounters = (rowCount: number, colCount: number, minefield: MinefieldRecord): void => {
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
          minefield[cellKey] = buildMineCounterCell({ value: neighborMineCount })
        }
      }
    }
  }
}

export const generateMinefield = (rowCount = 3, colCount = 3, totalMines = 3): GeneratedMinefieldRecord => {
  const minefield = generateEmptyMinefield(rowCount, colCount)

  const randomMineCellKeys = injectRandomMines(rowCount, colCount, totalMines, minefield)
  injectMineCounters(rowCount, colCount, minefield)
  const emptyRegions = injectEmptyCellRegions(rowCount, colCount, minefield)

  return { minefield, randomMineCellKeys, emptyRegions }
}
