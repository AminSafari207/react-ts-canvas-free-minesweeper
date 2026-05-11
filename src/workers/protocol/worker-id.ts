export const WorkerId = {
  MINEFIELD: 'MINEFIELD',
} as const

export type WorkerId = (typeof WorkerId)[keyof typeof WorkerId]
