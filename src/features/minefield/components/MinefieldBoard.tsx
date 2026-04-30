import { Box } from '@mui/material'
import { GameStatus } from 'src/core/game'
import { useGameStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'
import MinefieldBoardGrid from './MinefieldBoardGrid'
import { MinefieldBoardGridSkeleton } from './MinefieldBoardGridSkeleton'
import { ZoomPanPinchWrapper } from './ZoomPanPinchWrapper'

export default function MinefieldBoard() {
  const { rowCount, colCount, gameStatus } = useGameStore(
    useShallow((s) => ({ rowCount: s.rowCount, colCount: s.colCount, gameStatus: s.gameStatus }))
  )

  if (gameStatus === GameStatus.LOADING) {
    return <MinefieldBoardGridSkeleton />
  }

  return (
    <Box width="100vw" height="100vh">
      <ZoomPanPinchWrapper rowCount={rowCount}>
        <MinefieldBoardGrid rowCount={rowCount} colCount={colCount} gameStatus={gameStatus} />
      </ZoomPanPinchWrapper>
    </Box>
  )
}
