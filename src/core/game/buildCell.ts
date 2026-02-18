import { CellType, EmptyCell, MineCell, MineCounterCell, MineCounterValue } from './types/types'

const defaultBaseCellProps = {
  isSelected: false,
  isFlagged: false,
}

const defaultEmptyCellProps = { ...defaultBaseCellProps }

const defaultMineCellProps = { ...defaultBaseCellProps }

const defaultMineCounterCellProps = { ...defaultBaseCellProps }

export const buildEmptyCell = (props?: Partial<Omit<EmptyCell, 'type'>>): EmptyCell => ({
  type: CellType.EMPTY,
  ...defaultEmptyCellProps,
  ...props,
})

export const buildMineCell = (props?: Partial<Omit<MineCell, 'type'>>): MineCell => ({
  type: CellType.MINE,
  ...defaultMineCellProps,
  ...props,
})

export const buildMineCounterCell = (props: Partial<Omit<MineCounterCell, 'type'>> & { value: MineCounterValue }): MineCounterCell => ({
  type: CellType.MINE_COUNTER,
  ...defaultMineCounterCellProps,
  ...props,
})
