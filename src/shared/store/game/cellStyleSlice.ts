import { minefieldUI } from 'src/shared/constants'
import { StateCreator } from 'zustand'
import { CellStyleSlice } from './types/cellStyleSliceTypes'
import { GameStore } from './types/gameStoreTypes'

const CELL_SIZE = minefieldUI.cellSize

export const createCellStyleSlice: StateCreator<GameStore, [], [], CellStyleSlice> = (set, get) => ({
  cellStyles: {
    concealed: {},
    empty: {},
    exploded: {},
    mine: {},
    mineCounters: [],
  },

  renewCellStyles: (theme) => {
    const isDark = theme.palette.mode === 'dark'
    const shade = isDark ? 'light' : 'dark'

    const textShadow = `0px 1px 1px ${theme.palette.grey[900]}`

    const base = {
      width: `${CELL_SIZE}px`,
      height: `${CELL_SIZE}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      contain: 'layout style paint',
    } as const

    const concealed = {
      background: isDark ? theme.palette.grey[800] : theme.palette.grey[500],
      boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.15), inset -2px -2px 0 rgba(0,0,0,0.4)',
      cursor: 'pointer',
    } as const

    const revealed = {
      background: isDark ? theme.palette.grey[700] : theme.palette.grey[300],
      boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.5)',
      cursor: 'default',
      userSelect: 'none',
    } as const

    const exploded = {
      background: theme.palette.error.main,
    } as const

    const mine = {
      fontSize: '1.825rem',
      color: 'inherit',
      textShadow,
    } as const

    const mineCounter = {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      textShadow,
    } as const

    const mineCounterColors = [
      {},
      theme.palette.primary[shade],
      theme.palette.success[shade],
      theme.palette.error[shade],
      theme.palette.secondary[shade],
      theme.palette.warning[shade],
      theme.palette.info[shade],
      theme.palette.secondary[shade],
      theme.palette.error[shade],
    ] as const

    const revealedBase = { ...base, ...revealed } as const

    set({
      cellStyles: Object.freeze({
        concealed: Object.freeze({ ...base, ...concealed }),
        empty: Object.freeze(revealedBase),
        mine: Object.freeze({ ...revealedBase, ...mine }),
        exploded: Object.freeze({ ...revealedBase, ...mine, ...exploded }),
        mineCounters: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((c) =>
          Object.freeze({ ...revealedBase, ...mineCounter, color: mineCounterColors[c] })
        ),
      }),
    })
  },
})
