export enum CellType {
  EMPTY,
  MINE,
  MINE_COUNTER,
}

export enum GameStatus {
  IDLE,
  LOADING,
  PLAYING,
  PAUSED,
  WIN,
  LOSE,
}

export type MineCounterValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type FlagAnimPhase = 'idle' | 'out'

export interface BaseCell {
  isRevealed: boolean
  isFlagged: boolean
  flagAnimPhase: FlagAnimPhase
}

export interface EmptyCell extends BaseCell {
  type: CellType.EMPTY
  regionId?: number
}

export interface MineCell extends BaseCell {
  type: CellType.MINE
  isExploded?: boolean
}

export interface MineCounterCell extends BaseCell {
  type: CellType.MINE_COUNTER
  value: MineCounterValue
}

export type MinefieldCell = EmptyCell | MineCell | MineCounterCell

export type MinefieldRecord = Record<CellKey, MinefieldCell>

export type MinefieldCellArgProps = Partial<Omit<MinefieldCell, 'type'>>

export type CellKey = `${number}_${number}`

export type CellCoordinates = [number, number]
