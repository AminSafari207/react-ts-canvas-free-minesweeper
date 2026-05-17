import { CSSProperties, memo, useCallback, useMemo } from 'react'
import { CellType, coordsToCellKey } from 'src/core/game'
import { MinefieldBoardGridCellProps } from 'src/features/minefield/types/MinefieldBoardGridCellTypes'
import { useGameStore } from 'src/shared/store'
import { isIOS } from 'src/shared/utils'
import { FlagWithAnimation } from './FlagWithAnimation'
import { useCellLongPress } from './hooks/useCellLongPress'

const MinefieldBoardGridCell = memo(({ rowIndex, colIndex }: MinefieldBoardGridCellProps) => {
  const cellKey = useMemo(() => coordsToCellKey(rowIndex, colIndex), [rowIndex, colIndex])

  const cellState = useGameStore((s) => s.cells[cellKey])
  const cellStyles = useGameStore((s) => s.cellStyles)

  const { toggleFlagCell, revealCellWithEffects } = useGameStore.getState()

  const cellType = cellState?.type
  const isMine = cellType === CellType.MINE
  const isMineCounter = cellType === CellType.MINE_COUNTER
  const isRevealed = Boolean(cellState?.isRevealed)
  const isFlagged = Boolean(cellState?.isFlagged)
  const isExploded = isMine && Boolean(cellState?.isExploded)
  const counterValue = isMineCounter ? cellState.value : 0

  const styles: CSSProperties = useMemo(() => {
    if (!isRevealed) {
      return cellStyles.concealed
    } else if (isExploded) {
      return cellStyles.exploded
    } else if (isMine) {
      return cellStyles.mine
    } else if (counterValue > 0) {
      return cellStyles.mineCounters[counterValue]
    } else {
      return cellStyles.empty
    }
  }, [cellState, cellStyles])

  const longPressHandlers = isIOS ? useCellLongPress(() => toggleFlagCell(cellKey), 200) : undefined

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
      {!isRevealed && isFlagged && <FlagWithAnimation visible={isFlagged} />}
      {isRevealed && isMine && '💣'}
      {isRevealed && isMineCounter && counterValue}
    </div>
  )
})

export default MinefieldBoardGridCell
