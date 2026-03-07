import { CellKey, CellType } from 'src/core/game'

export type CreateHandleSelectCellParams = {
  cellKey: CellKey
  cellType: CellType
  isFlagged: boolean
}

export type CellClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void

export type CreateHandleSelectCell = ({ cellKey, cellType, isFlagged }: CreateHandleSelectCellParams) => CellClickHandler
