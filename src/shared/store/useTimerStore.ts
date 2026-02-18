import { create } from 'zustand'
import { TimerStore } from './types/timeStoreTypes'

let intervalId: number | null = null

export const useTimerStore = create<TimerStore>((set, get) => ({
  seconds: 0,
  running: false,

  startTimer: () => {
    if (get().running) return

    intervalId = window.setInterval(() => {
      get().tick()
    }, 1000)

    set({ running: true })
  },
  stopTimer: () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }

    set({ running: false })
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
}))
