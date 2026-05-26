import { CSSProperties, memo, useCallback, useMemo } from 'react'
import { CellType, coordsToCellKey } from 'src/core/game'
import { MinefieldBoardGridCellProps } from 'src/features/minefield/components/types/MinefieldBoardGridCellTypes'
import { useGameStore } from 'src/shared/store'
import { isIOS } from 'src/shared/utils'
import { CellFlag } from './CellFlag'
import { useCellLongPress } from './hooks/useCellLongPress'

const MinefieldBoardGridCell = memo(({ rowIndex, colIndex, cellStyles }: MinefieldBoardGridCellProps) => {
  const cellKey = useMemo(() => coordsToCellKey(rowIndex, colIndex), [rowIndex, colIndex])

  const cellState = useGameStore((s) => s.cells[cellKey])

  const { toggleFlagCell, revealCellWithEffects } = useGameStore.getState()

  const cellType = cellState?.type
  const isMine = cellType === CellType.MINE
  const isMineCounter = cellType === CellType.MINE_COUNTER
  const isRevealed = Boolean(cellState?.isRevealed)
  const isExploded = isMine && Boolean(cellState?.isExploded)
  const counterValue = isMineCounter ? cellState.value : 0

  const styles: CSSProperties = useMemo(() => {
    if (!isRevealed) return cellStyles.concealed
    if (isMine) {
      if (isExploded) return cellStyles.exploded
      return cellStyles.mine
    }
    if (counterValue > 0) return cellStyles.mineCounters[counterValue]
    return cellStyles.empty
  }, [cellState, cellStyles])

  const longPressHandlers = isIOS() ? useCellLongPress(() => toggleFlagCell(cellKey), 200) : undefined

  const handleRevealCell = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      revealCellWithEffects(cellKey)
    },
    [cellKey]
  )

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (isRevealed) return
      toggleFlagCell(cellKey)
    },
    [isRevealed, cellKey]
  )

  return (
    <div style={styles} onClick={handleRevealCell} onContextMenu={handleContextMenu} {...longPressHandlers}>
      {!isRevealed && <CellFlag isFlagged={cellState.isFlagged} flagAnimPhase={cellState.flagAnimPhase} />}
      {isRevealed && isMine && '💣'}
      {isRevealed && isMineCounter && counterValue}
    </div>
  )
})

export default MinefieldBoardGridCell
