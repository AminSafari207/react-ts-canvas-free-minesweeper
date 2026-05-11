import { Box } from '@mui/material'
import { GameStatus } from 'src/core/game'
import { useGameStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'
import MinefieldBoardGrid from './MinefieldBoardGrid'
import { MinefieldBoardGridSkeleton } from './MinefieldBoardGridSkeleton'
import { ZoomPanPinchWrapper } from './ZoomPanPinchWrapper'

export default function MinefieldBoard() {
  const { totalRows, totalColumns, gameStatus } = useGameStore(
    useShallow((s) => ({ totalRows: s.totalRows, totalColumns: s.totalColumns, gameStatus: s.gameStatus }))
  )

  if (gameStatus === GameStatus.LOADING) {
    return <MinefieldBoardGridSkeleton />
  }

  return (
    <Box width="100vw" height="100vh">
      <ZoomPanPinchWrapper totalRows={totalRows}>
        <MinefieldBoardGrid totalRows={totalRows} totalColumns={totalColumns} gameStatus={gameStatus} />
      </ZoomPanPinchWrapper>
    </Box>
  )
}
