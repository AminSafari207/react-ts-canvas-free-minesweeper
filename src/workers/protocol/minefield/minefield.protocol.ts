import { GeneratedMinefieldRecord } from 'src/core/game'

export const MinefieldMessageType = {
  GENERATE: 'MINEFIELD/GENERATE',
} as const

export type MinefieldMessageType = (typeof MinefieldMessageType)[keyof typeof MinefieldMessageType]

export interface GenerateMinefieldRequest {
  type: typeof MinefieldMessageType.GENERATE
  totalRows: number
  totalColumns: number
  totalMines: number
  seed?: number // TODO
}

export type GenerateMinefieldResponse = GeneratedMinefieldRecord

export type MinefieldRequest = GenerateMinefieldRequest

export type MinefieldResponse = GenerateMinefieldResponse
