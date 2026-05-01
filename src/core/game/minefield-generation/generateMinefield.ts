import { GeneratedMinefieldRecord } from '../types/generateMinefieldTypes'
import { generateEmptyMinefield } from './generateEmptyMinefield'
import { injectEmptyCellRegions } from './injectEmptyCellRegions'
import { injectMineCounters } from './injectMineCounters'
import { injectRandomMines } from './injectRandomMines'

export const generateMinefield = (rowCount = 3, colCount = 3, totalMines = 3): GeneratedMinefieldRecord => {
  const minefield = generateEmptyMinefield(rowCount, colCount)
  const randomMineCellKeys = injectRandomMines(rowCount, colCount, totalMines, minefield)
  injectMineCounters(rowCount, colCount, minefield)
  const emptyRegions = injectEmptyCellRegions(rowCount, colCount, minefield)

  return { minefield, randomMineCellKeys, emptyRegions }
}
