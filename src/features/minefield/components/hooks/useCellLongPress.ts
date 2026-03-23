import { useMemo, useRef } from 'react'
import { LongPressHanlders } from './types/useCellLongPressTypes'

const MOVE_THRESHOLD = 4

export const useCellLongPress = (onLongPress: () => void, delay = 450): LongPressHanlders => {
  const timerRef = useRef<number | null>(null)
  const triggeredRef = useRef(false)
  const startRef = useRef<{ x: number; y: number } | null>(null)
  const movedRef = useRef(false)

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  return useMemo<LongPressHanlders>(
    () => ({
      onPointerDown: (e: React.PointerEvent) => {
        if (e.pointerType !== 'touch') return

        triggeredRef.current = false
        movedRef.current = false
        startRef.current = { x: e.clientX, y: e.clientY }
        clear()

        timerRef.current = window.setTimeout(() => {
          if (!movedRef.current) {
            triggeredRef.current = true
            onLongPress()
          }
        }, delay)
      },

      onPointerMove: (e: React.PointerEvent) => {
        if (e.pointerType !== 'touch' || !startRef.current) return

        const dx = e.clientX - startRef.current.x
        const dy = e.clientY - startRef.current.y

        if (dx * dx + dy * dy > MOVE_THRESHOLD * MOVE_THRESHOLD) {
          movedRef.current = true
          clear()
        }
      },

      onPointerUp: clear,
      onPointerCancel: clear,
      onPointerLeave: clear,

      onClickCapture: (e: React.MouseEvent) => {
        if (triggeredRef.current) {
          e.preventDefault()
          e.stopPropagation()
        }
      },
    }),
    [onLongPress, delay]
  )
}
