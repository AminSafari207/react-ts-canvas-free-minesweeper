import { CellKey, CellType } from 'src/core/game'

export type CreateHandleRevealCellParams = {
  cellKey: CellKey
  cellType: CellType
  isFlagged: boolean
}

export type CellClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void

export type CreateHandleRevealCell = ({ cellKey, cellType, isFlagged }: CreateHandleRevealCellParams) => CellClickHandler
