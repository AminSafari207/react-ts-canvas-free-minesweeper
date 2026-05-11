import { GeneratedMinefieldRecord } from '../types/generateMinefieldTypes'
import { generateEmptyMinefield } from './generateEmptyMinefield'
import { injectEmptyCellRegions } from './injectEmptyCellRegions'
import { injectMineCounters } from './injectMineCounters'
import { injectRandomMines } from './injectRandomMines'

export const generateMinefield = (totalRows = 3, totalColumns = 3, totalMines = 3): GeneratedMinefieldRecord => {
  const minefield = generateEmptyMinefield(totalRows, totalColumns)
  const randomMineCellKeys = injectRandomMines(totalRows, totalColumns, totalMines, minefield)
  injectMineCounters(totalRows, totalColumns, minefield)
  const emptyRegions = injectEmptyCellRegions(totalRows, totalColumns, minefield)

  return { minefield, randomMineCellKeys, emptyRegions }
}
