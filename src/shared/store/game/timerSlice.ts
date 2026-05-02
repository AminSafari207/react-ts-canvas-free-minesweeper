import { StateCreator } from 'zustand'
import { GameStore } from './types/gameStoreTypes'
import { TimerSlice } from './types/timerSliceTypes'

let intervalId: number | null = null

export const createTimerSlice: StateCreator<GameStore, [], [], TimerSlice> = (set, get) => ({
  seconds: 0,

  startTimer: () => {
    if (intervalId !== null) return

    intervalId = window.setInterval(() => {
      get().tick()
    }, 1000)
  },

  stopTimer: () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  },

  resetTimer: () => {
    get().stopTimer()
    set({ seconds: 0 })
  },

  tick: () => {
    set((state) => {
      if (state.seconds >= 999) {
        get().stopTimer()
        return state
      }

      return { seconds: state.seconds + 1 }
    })
  },
})
