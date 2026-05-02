import { useMemo } from 'react'
import { GrainientProps } from 'src/shared/background/grainient'
import Grainient from 'src/shared/background/grainient/Grainient'
import { useThemeStore } from 'src/shared/store'
import { stripHexAlpha } from 'src/shared/utils'
import { useShallow } from 'zustand/shallow'

export const createBackgroundGrainientProps = (isDark: boolean): GrainientProps => ({
  color1: stripHexAlpha(isDark ? '#3a3e48' : '#b7c4df'),
  color2: stripHexAlpha(isDark ? '#5c677b' : '#8da3c7'),
  color3: stripHexAlpha(isDark ? '#4d5f7b' : '#76859d'),
  timeSpeed: 0.35,
  colorBalance: 0,
  grainAmount: 0.05,
  contrast: 1,
  gamma: 1,
  saturation: 1,
})

export const BackgroundGrainient = () => {
  const themeMode = useThemeStore(useShallow((s) => s.themeMode))

  const isDark = themeMode === 'dark'

  const grainientProps: GrainientProps = useMemo(() => createBackgroundGrainientProps(isDark), [isDark])

  return <Grainient {...grainientProps} />
}
