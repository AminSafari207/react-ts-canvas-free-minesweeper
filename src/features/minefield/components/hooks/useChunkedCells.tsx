import { useMemo } from 'react'
import { CellCoordinates } from 'src/core/game'
import { useChunkedMount } from 'src/shared/utils'
import { UseChunkedCellsOptions, UseChunkedCellsReturn } from '../types/useChunkedCellsTypes'

export const useChunkedCells = ({ totalRows, totalColumns, chunkSize, enabled = true }: UseChunkedCellsOptions): UseChunkedCellsReturn => {
  const totalCells = totalRows * totalColumns

  const allCells = useMemo(() => {
    const cells: CellCoordinates[] = []

    for (let rowIndex = 0; rowIndex < totalRows; rowIndex += 1) {
      for (let colIndex = 0; colIndex < totalColumns; colIndex += 1) {
        cells.push([rowIndex, colIndex])
      }
    }

    return cells
  }, [totalRows, totalColumns])

  const { mountedCount, isFullyMounted } = useChunkedMount({
    totalItems: totalCells,
    chunkSize,
    enabled,
  })

  if (!enabled) {
    return {
      visibleCells: allCells,
      isFullyMounted: true,
      mountedCount,
    }
  }

  return {
    visibleCells: allCells.slice(0, mountedCount),
    isFullyMounted,
    mountedCount,
  }
}
