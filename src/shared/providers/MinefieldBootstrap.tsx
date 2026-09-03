import { PropsWithChildren, useEffect } from 'react'
import { useGameStore } from 'src/shared/store'

export const MinefieldBootstrap = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const game = useGameStore.getState()
    game.startInitialGame()
  }, [])

  return children
}
