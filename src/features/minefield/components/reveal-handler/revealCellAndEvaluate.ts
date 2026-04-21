import { CellType, EmptyCell, GameStatus } from 'src/core/game'
import { useGameStore } from 'src/shared/store'
import { RevealCellAndEvaluateFn } from '../../types/revealHandlerTypes'

export const revealCellAndEvaluate: RevealCellAndEvaluateFn = (cellKey, cellType, isFlagged) => {
  const game = useGameStore.getState()

  if (isFlagged || game.gameStatus !== GameStatus.PLAYING) {
    return { type: 'NOOP' }
  }

  if (cellType === CellType.MINE) {
    game.explodeMine(cellKey)
    game.revealMultipleCells(game.randomMineCellKeys)
    game.stopTimer()
    game.changeGameStatus(GameStatus.LOSE)

    return { type: 'LOSE' }
  }

  if (cellType === CellType.MINE_COUNTER) {
    game.revealCell(cellKey)
  }

  if (cellType === CellType.EMPTY) {
    const cell = game.cells[cellKey] as EmptyCell
    const regionId = cell.regionId

    if (regionId === undefined) {
      throw new Error(`Empty cell (${cellKey}) is missing regionId`)
    }

    const region = game.emptyRegions[regionId]

    if (!region.isRevealed) {
      game.revealEmptyRegion(regionId)
    } else {
      game.revealCell(cellKey)
    }
  }

  if (game.hasWon()) {
    game.stopTimer()
    game.changeGameStatus(GameStatus.WIN)

    return { type: 'WIN' }
  }

  return { type: 'NOOP' }
}
