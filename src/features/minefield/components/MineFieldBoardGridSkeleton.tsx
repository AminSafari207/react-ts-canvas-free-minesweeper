import { Box, Skeleton, Stack } from '@mui/material'

const mineFieldTemplate = Array.from({ length: 16 }, () => Array.from({ length: 16 }))

export const MineFieldBoardGridSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        width: 'calc(100vw - 10px)',
        height: 'calc(100vw - 10px)',
        maxWidth: 600,
        maxHeight: 600,
        border: `0.75rem ridge rgba(131, 131, 131, 0.46)`,
        borderRadius: 1,
        overflow: 'hidden',
        animationDuration: '0.75s',
      }}
    >
      {mineFieldTemplate.map((row, rowIndex) => {
        return (
          <Stack key={`skeleton-grid-${rowIndex}`} direction="row" height={'calc(100% / 16)'}>
            {row.map((_, colIndex) => (
              <Box
                key={`skeleton-grid-${rowIndex}-${colIndex}`}
                sx={{
                  width: 'calc(100% / 16)',
                  height: '100%',
                  border: '1px solid rgb(84, 84, 84)',
                  color: 'transparent',
                  visibility: 'visible',
                }}
              />
            ))}
          </Stack>
        )
      })}
    </Skeleton>
  )
}
