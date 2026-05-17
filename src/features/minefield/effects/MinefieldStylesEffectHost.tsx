import { useTheme } from '@mui/material'
import { useEffect } from 'react'
import { useGameStore } from 'src/shared/store'

export const MinefieldStylesEffectHost = () => {
  const theme = useTheme()
  const renewCellStyles = useGameStore((s) => s.renewCellStyles)

  useEffect(() => {
    renewCellStyles(theme)
  }, [theme])

  return null
}
