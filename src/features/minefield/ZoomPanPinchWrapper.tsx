import { Box } from '@mui/material'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { ZoomPanPinchWrapperProps } from './types/ZoomPanPinchWrapperTypes'

const MIN_ZOOM = 0.2
const MAX_ZOOM = 2.0
const VERTICAL_MARGIN = 120
const MOVE_THRESHOLD = 4

export const ZoomPanPinchWrapper = ({ children, rowCount }: ZoomPanPinchWrapperProps) => {
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null)
  const boardRef = useRef<HTMLDivElement | null>(null)

  const pointerStartRef = useRef<{ x: number; y: number } | null>(null)
  const didMoveRef = useRef(false)

  const [initialScale, setInitialScale] = useState<number | null>(null)

  useLayoutEffect(() => {
    const el = boardRef.current

    if (!el) return

    const vw = window.innerWidth
    const vh = window.innerHeight
    const boardW = el.offsetWidth
    const boardH = el.offsetHeight
    const availableW = vw
    const availableH = vh - 2 * VERTICAL_MARGIN

    let initialScale: number

    if (boardW <= vw && rowCount <= 12) {
      initialScale = 1.1
    } else {
      initialScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.min(availableW / boardW, availableH / boardH)))
    }

    setInitialScale(initialScale)
  }, [])

  const memoChildren = useMemo(() => children, [children])

  if (initialScale === null) {
    return (
      <Box
        ref={boardRef}
        sx={{
          position: 'absolute',
          top: -9999,
          left: -9999,
          visibility: 'hidden',
        }}
      >
        {memoChildren}
      </Box>
    )
  }

  return (
    <TransformWrapper
      ref={transformRef}
      minScale={MIN_ZOOM}
      maxScale={MAX_ZOOM}
      initialScale={initialScale}
      limitToBounds={false}
      centerOnInit={true}
      alignmentAnimation={{ disabled: true }}
      doubleClick={{ disabled: true }}
      zoomAnimation={{ disabled: true }}
      wheel={{ step: 0.1 }}
      pinch={{ step: 5 }}
    >
      <TransformComponent
        wrapperStyle={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          touchAction: 'none',
        }}
      >
        <div
          onPointerDownCapture={(e) => {
            pointerStartRef.current = { x: e.clientX, y: e.clientY }
            didMoveRef.current = false
          }}
          onPointerMoveCapture={(e) => {
            if (!pointerStartRef.current) return

            const dx = e.clientX - pointerStartRef.current.x
            const dy = e.clientY - pointerStartRef.current.y

            if (dx * dx + dy * dy > MOVE_THRESHOLD * MOVE_THRESHOLD) {
              didMoveRef.current = true
            }
          }}
          onPointerUpCapture={() => {
            pointerStartRef.current = null
          }}
          onClickCapture={(e) => {
            if (didMoveRef.current) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          {memoChildren}
        </div>
      </TransformComponent>
    </TransformWrapper>
  )
}
