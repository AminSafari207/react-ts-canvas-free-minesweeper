import { useEffect, useState } from 'react'
import { UseChunkedMountOptions } from './types/useChunkedMountTypes'

const DEFAULT_CHUNK_SIZE = 100

// export const useChunkedMount = ({ totalItems, chunkSize = DEFAULT_CHUNK_SIZE }: UseChunkedMountOptions): UseChunkedMountReturn => {
//   const [mountedCount, setMountedCount] = useState(0)
//   const [isFullyMounted, setIsFullyMounted] = useState(false)

//   const frameIdRef = useRef<number | null>(null)

//   useEffect(() => {
//     let currentCount = 0

//     setMountedCount(0)
//     setIsFullyMounted(false)

//     const mountChunk = () => {
//       currentCount = Math.min(currentCount + chunkSize, totalItems)
//       setMountedCount(currentCount)

//       if (currentCount < totalItems) {
//         frameIdRef.current = requestAnimationFrame(mountChunk)
//         return
//       }

//       setIsFullyMounted(true)
//     }

//     frameIdRef.current = requestAnimationFrame(mountChunk)

//     return () => {
//       if (frameIdRef.current !== null) {
//         cancelAnimationFrame(frameIdRef.current)
//       }
//     }
//   }, [totalItems, chunkSize])

//   return {
//     mountedCount,
//     isFullyMounted,
//   }
// }

export const useChunkedMount = ({ totalItems, chunkSize = DEFAULT_CHUNK_SIZE, enabled = true }: UseChunkedMountOptions) => {
  const [mountedCount, setMountedCount] = useState(() => {
    if (!enabled) return totalItems
    return Math.min(chunkSize, totalItems)
  })

  useEffect(() => {
    if (!enabled) {
      setMountedCount(totalItems)
      return
    }

    setMountedCount(Math.min(chunkSize, totalItems))
  }, [enabled, totalItems, chunkSize])

  useEffect(() => {
    if (!enabled) return
    if (mountedCount >= totalItems) return

    let frameId = window.requestAnimationFrame(() => {
      setMountedCount((prev) => Math.min(prev + chunkSize, totalItems))
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [enabled, mountedCount, totalItems, chunkSize])

  return {
    mountedCount,
    isFullyMounted: mountedCount >= totalItems,
  }
}
