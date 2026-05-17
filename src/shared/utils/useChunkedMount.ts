import { useEffect, useRef, useState } from 'react'
import { UseChunkedMountOptions, UseChunkedMountReturn } from './types/useChunkedMountTypes'

const DEFAULT_CHUNK_SIZE = 100

export const useChunkedMount = ({ totalItems, chunkSize = DEFAULT_CHUNK_SIZE }: UseChunkedMountOptions): UseChunkedMountReturn => {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isReadyToMount, setIsReadyToMount] = useState(false)

  const frameIdRef = useRef<number | null>(null)

  useEffect(() => {
    let mountedCount = 0

    setVisibleCount(0)
    setIsReadyToMount(false)

    const mountChunk = () => {
      mountedCount += chunkSize

      const nextVisibleCount = Math.min(mountedCount, totalItems)

      setVisibleCount(nextVisibleCount)

      if (nextVisibleCount < totalItems) {
        frameIdRef.current = requestAnimationFrame(mountChunk)

        return
      }

      setIsReadyToMount(true)
    }

    frameIdRef.current = requestAnimationFrame(mountChunk)

    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current)
      }
    }
  }, [chunkSize, totalItems])

  return { visibleCount, isReadyToMount }
}
