import { StateCreator } from 'zustand'
import { GameStore } from './types/gameStoreTypes'
import { TimerSlice } from './types/timerSliceTypes'

export const timerSliceStateDefaults = {
  seconds: 0,
} satisfies Pick<TimerSlice, 'seconds'>

let intervalId: number | null = null

export const createTimerSlice: StateCreator<GameStore, [], [], TimerSlice> = (set, get) => {
  const tick = () => {
    set((state) => {
      if (state.seconds >= 999) {
        get().stopTimer()
        return state
      }

      return { seconds: state.seconds + 1 }
    })
  }

  return {
    ...timerSliceStateDefaults,

    startTimer: () => {
      if (intervalId !== null) return

      intervalId = window.setInterval(() => {
        tick()
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
  }
}
