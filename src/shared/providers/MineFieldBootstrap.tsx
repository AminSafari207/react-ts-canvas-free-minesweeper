import { PropsWithChildren, useEffect } from 'react'
import { useGameStore } from 'src/shared/store'

export const MineFieldBootstrap = ({ children }: PropsWithChildren) => {
  const game = useGameStore.getState()
  
  useEffect(game.startNewGame, [])

  return children
}
