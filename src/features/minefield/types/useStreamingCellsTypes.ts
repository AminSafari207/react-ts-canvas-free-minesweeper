import { JSX } from "react"

export type UseStreamingCellsOptions = {
  totalRows: number
  totalColumns: number
  chunkSize?: number
}

export type UseStreamingCellsReturn = {
  renderedCells: JSX.Element[]
  isReadyToMount: boolean
}
