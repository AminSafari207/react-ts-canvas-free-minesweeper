export interface TimerStore {
  seconds: number
  running: boolean
  startTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
  tick: () => void
}
