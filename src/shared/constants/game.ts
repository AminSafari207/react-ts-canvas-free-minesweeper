export const minefieldConfig = {
  limits: {
    dimensions: {
      rows: { min: 9, max: 30 },
      cols: { min: 9, max: 30 },
    },
    mines: {
      count: { min: 10 },
    },
  },
  ui: {
    cellSize: 50,
    
    flag: {
      animation: { inMs: 220, outMs: 180 },
    },
  }
} as const

