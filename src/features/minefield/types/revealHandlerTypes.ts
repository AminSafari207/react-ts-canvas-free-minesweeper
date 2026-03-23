import { CellKey, CellType } from 'src/core/game'

export type CreateHandleRevealCellParams = {
  cellKey: CellKey
  cellType: CellType
  isFlagged: boolean
}

export type CellClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void

export type CreateHandleRevealCellFn = ({ cellKey, cellType, isFlagged }: CreateHandleRevealCellParams) => CellClickHandler

export type RevealResult = { type: 'WIN' } | { type: 'LOSE' } | { type: 'NOOP' }

export type RevealCellAndEvaluateFn = (cellKey: CellKey, cellType: CellType, isFlagged: boolean) => RevealResult

export type ShowGameResultModalFn = (revealResult: RevealResult) => void
