import { CreateHandleRevealCellFn } from '../../types/revealHandlerTypes'
import { revealCellAndEvaluate } from './revealCellAndEvaluate'
import { showGameResultModal } from './showGameResultModal'

export const createHandleRevealCell: CreateHandleRevealCellFn = ({ cellKey, cellType, isFlagged }) => {
  return (e) => {
    e.preventDefault()

    const event = revealCellAndEvaluate(cellKey, cellType, isFlagged)

    showGameResultModal(event)
  }
}
