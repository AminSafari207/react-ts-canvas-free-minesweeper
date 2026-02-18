import { PropsWithChildren, useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { useMineFieldMetaDataStore } from '../store/useMineFieldMetaDataStore'

export const MineFieldBootstrap = ({ children }: PropsWithChildren) => {
  const startNewGame = useMineFieldMetaDataStore(useShallow((s) => s.startNewGame))

  useEffect(() => {
    startNewGame()
  }, [])

  return children
}
