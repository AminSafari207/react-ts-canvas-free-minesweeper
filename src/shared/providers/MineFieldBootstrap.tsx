import { PropsWithChildren, useEffect } from 'react'
import { useGameStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'

export const MineFieldBootstrap = ({ children }: PropsWithChildren) => {
  const startNewGame = useGameStore(useShallow((s) => s.startNewGame))

  useEffect(() => {
    startNewGame()
  }, [])

  return children
}
