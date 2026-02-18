export enum CellType {
  EMPTY,
  MINE,
  MINE_COUNTER,
}

export enum GameStatus {
  LOADING,
  PLAYING,
  PAUSED,
  WIN,
  LOSE,
}

export type MineCounterValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface BaseCell {
  type: CellType
  isSelected: boolean
  isFlagged: boolean
}

export interface EmptyCell extends BaseCell {
  type: CellType.EMPTY
}

export interface MineCell extends BaseCell {
  type: CellType.MINE
  isExploded?: boolean
}

export interface MineCounterCell extends BaseCell {
  type: CellType.MINE_COUNTER
  value: MineCounterValue
}

export type MineFieldCell = EmptyCell | MineCell | MineCounterCell

export type MineFieldRecord = Record<CellKey, MineFieldCell>

export type MineFieldCellArgProps = Partial<Omit<MineFieldCell, 'type'>>

export type CellKey = `${number}_${number}`
