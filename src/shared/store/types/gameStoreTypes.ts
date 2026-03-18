import { BoardSlice } from './boardSliceTypes'
import { ConfigSlice } from './configSliceTypes'
import { GameplaySlice } from './gameplaySliceTypes'
import { TimerSlice } from './timerSliceTypes'

export type GameStore = ConfigSlice & GameplaySlice & BoardSlice & TimerSlice
