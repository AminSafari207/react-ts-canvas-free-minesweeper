import { BaseCell, CellType, EmptyCell, MineCell, MineCounterCell } from './types/types'

type WithoutBaseProps<T extends BaseCell> = Omit<T, keyof BaseCell>

type CellsByType = {
  [CellType.EMPTY]: EmptyCell
  [CellType.MINE]: MineCell
  [CellType.MINE_COUNTER]: MineCounterCell
}

type CellInput = {
  [K in keyof CellsByType]: WithoutBaseProps<CellsByType[K]>
}[keyof CellsByType]

const defaultBaseCellProps: BaseCell = {
  isRevealed: false,
  isFlagged: false,
}

export const buildCell = (input: CellInput): CellsByType[typeof input.type] => {
  return {
    ...defaultBaseCellProps,
    ...input,
  }
}
