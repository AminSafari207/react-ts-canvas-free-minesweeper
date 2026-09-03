import { Box } from '@mui/material'
import { useGameStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'
import { MinefieldBoardStage } from './MinefieldBoardStage'
import { ZoomPanPinchWrapper } from './ZoomPanPinchWrapper'

export default function MinefieldBoard() {
  const { totalRows, totalColumns, gameStatus, cellStyles, boardSessionId } = useGameStore(
    useShallow((s) => ({
      totalRows: s.totalRows,
      totalColumns: s.totalColumns,
      gameStatus: s.gameStatus,
      cellStyles: s.cellStyles,
      boardSessionId: s.boardSessionId,
    }))
  )

  return (
    <Box width="100vw" height="100vh">
      <ZoomPanPinchWrapper totalRows={totalRows} boardSessionId={boardSessionId}>
        {/* <MinefieldBoardGrid totalRows={totalRows} totalColumns={totalColumns} gameStatus={gameStatus} cellStyles={cellStyles} /> */}
        <MinefieldBoardStage totalRows={totalRows} totalColumns={totalColumns} gameStatus={gameStatus} cellStyles={cellStyles} />
      </ZoomPanPinchWrapper>
    </Box>
  )
}
