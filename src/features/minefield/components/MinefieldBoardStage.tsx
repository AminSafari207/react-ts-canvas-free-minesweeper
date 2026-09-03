import { styled } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useGameStore } from 'src/shared/store'
import { BoardLayer } from './BoardLayer'
import { MinefieldBoardGridProps } from './types/MinefieldBoardGridTypes'

const BoardContainer = styled('div')({
  position: 'relative',
  width: 'fit-content',
  height: 'fit-content',
})

export const MinefieldBoardStage = (props: MinefieldBoardGridProps) => {
  const boardSessionId = useGameStore((s) => s.boardSessionId)

  const [displayedSessionId, setDisplayedSessionId] = useState(boardSessionId)
  const [stagedSessionId, setStagedSessionId] = useState<number | null>(null)

  useEffect(() => {
    if (boardSessionId !== displayedSessionId) {
      setStagedSessionId(boardSessionId)
    }
  }, [boardSessionId, displayedSessionId])

  const handleStagedReady = useCallback(() => {
    if (stagedSessionId == null) return

    setDisplayedSessionId(stagedSessionId)
    setStagedSessionId(null)
  }, [stagedSessionId])

  return (
    <BoardContainer>
      <BoardLayer sessionId={displayedSessionId} mode="visible" {...props} />

      {stagedSessionId !== null && <BoardLayer sessionId={stagedSessionId} mode="staged" onReady={handleStagedReady} {...props} />}
    </BoardContainer>
  )
}
