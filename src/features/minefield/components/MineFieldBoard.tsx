import { Box } from '@mui/material'
import { GameStatus } from 'src/core/game'
import { useGameStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'
import MineFieldBoardGrid from './MineFieldBoardGrid'
import { MineFieldBoardGridSkeleton } from './MineFieldBoardGridSkeleton'
import { ZoomPanPinchWrapper } from './ZoomPanPinchWrapper'

export default function MineFieldBoard() {
  const { rowCount, colCount, gameStatus } = useGameStore(
    useShallow((s) => ({ rowCount: s.rowCount, colCount: s.colCount, gameStatus: s.gameStatus }))
  )

  if (gameStatus === GameStatus.LOADING) {
    return <MineFieldBoardGridSkeleton />
  }

  return (
    <Box width="100vw" height="100vh">
      <ZoomPanPinchWrapper rowCount={rowCount}>
        <MineFieldBoardGrid rowCount={rowCount} colCount={colCount} gameStatus={gameStatus} />
      </ZoomPanPinchWrapper>
    </Box>
  )
}
