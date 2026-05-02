export interface TimerSlice {
  seconds: number

  startTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
  tick: () => void
}
