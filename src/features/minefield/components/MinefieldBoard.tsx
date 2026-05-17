import { Box } from '@mui/material'
import { GameStatus } from 'src/core/game'
import { useGameStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'
import { useStreamingCells } from './hooks/useStreamingCells'
import MinefieldBoardGrid from './MinefieldBoardGrid'
import { MinefieldBoardGridSkeleton } from './MinefieldBoardGridSkeleton'
import { ZoomPanPinchWrapper } from './ZoomPanPinchWrapper'

export default function MinefieldBoard() {
  const { totalRows, totalColumns, gameStatus } = useGameStore(
    useShallow((s) => ({ totalRows: s.totalRows, totalColumns: s.totalColumns, gameStatus: s.gameStatus }))
  )

  const { renderedCells, isReadyToMount } = useStreamingCells({ totalRows, totalColumns })

  if (gameStatus === GameStatus.LOADING || !isReadyToMount) {
    return <MinefieldBoardGridSkeleton />
  }

  return (
    <Box width="100vw" height="100vh">
      <ZoomPanPinchWrapper totalRows={totalRows}>
        <MinefieldBoardGrid totalRows={totalRows} totalColumns={totalColumns} gameStatus={gameStatus} renderedCells={renderedCells} />
      </ZoomPanPinchWrapper>
    </Box>
  )
}
