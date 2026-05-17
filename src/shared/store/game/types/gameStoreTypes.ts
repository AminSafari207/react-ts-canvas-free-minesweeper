import { BoardSlice } from './boardSliceTypes'
import { CellStyleSlice } from './cellStyleSliceTypes'
import { ConfigSlice } from './configSliceTypes'
import { GameplaySlice } from './gameplaySliceTypes'
import { TimerSlice } from './timerSliceTypes'

export type GameStore = ConfigSlice & GameplaySlice & BoardSlice & TimerSlice & CellStyleSlice
