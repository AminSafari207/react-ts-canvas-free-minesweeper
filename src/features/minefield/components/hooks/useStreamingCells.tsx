import { JSX, useEffect, useRef } from 'react'
import { useChunkedMount } from 'src/shared/utils'
import { UseStreamingCellsOptions, UseStreamingCellsReturn } from '../../types/useStreamingCellsTypes'
import MinefieldBoardGridCell from '../MinefieldBoardGridCell'

export const useStreamingCells = ({ totalRows, totalColumns, chunkSize }: UseStreamingCellsOptions): UseStreamingCellsReturn => {
  const totalCells = totalRows * totalColumns

  const { visibleCount, isReadyToMount } = useChunkedMount({
    totalItems: totalCells,
    chunkSize,
  })

  const cellsRef = useRef<JSX.Element[]>([])

  useEffect(() => {
    cellsRef.current = []
  }, [totalRows, totalColumns])

  if (cellsRef.current.length < visibleCount) {
    const start = cellsRef.current.length

    let rowIndex = Math.floor(start / totalColumns)
    let colIndex = start % totalColumns

    for (let i = start; i < visibleCount; i++) {
      cellsRef.current.push(<MinefieldBoardGridCell key={`cell-${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} />)

      colIndex++

      if (colIndex === totalColumns) {
        colIndex = 0
        rowIndex++
      }
    }
  }

  return {
    renderedCells: cellsRef.current,
    isReadyToMount,
  }
}
