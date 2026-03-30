export const minefieldLimits = {
  dimensions: {
    rows: { min: 9, max: 30 },
    cols: { min: 9, max: 30 },
  },
  mines: {
    count: { min: 10 },
  },
} as const
