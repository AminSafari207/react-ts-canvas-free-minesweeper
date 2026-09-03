import { GeneratedMinefieldRecord } from '../types/generateMinefieldTypes'
import { generateEmptyMinefield } from './generateEmptyMinefield'
import { injectEmptyCellRegions } from './injectEmptyCellRegions'
import { injectMineCounters } from './injectMineCounters'
import { injectRandomMines } from './injectRandomMines'

export const generateMinefield = (totalRows = 3, totalColumns = 3, totalMines = 3): GeneratedMinefieldRecord => {
  const cells = generateEmptyMinefield(totalRows, totalColumns)
  const randomMineCellKeys = injectRandomMines(totalRows, totalColumns, totalMines, cells)
  injectMineCounters(totalRows, totalColumns, cells)
  const emptyRegions = injectEmptyCellRegions(totalRows, totalColumns, cells)

  return { cells, randomMineCellKeys, emptyRegions }
}
