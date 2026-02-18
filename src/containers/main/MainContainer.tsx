import { lazy, Suspense, useMemo } from 'react'
import { useThemeMode } from 'src/core/theme'
import Grainient, { GrainientProps } from 'src/shared/background/grainient/Grainient'
import { BackgroundRegion, ContentRegion, MainLayout, TopMenuBarRegion } from 'src/shared/layouts/main'
import { FullPageLoadingSuspenseFallback } from 'src/shared/loading'

const stripAlpha = (hex: string) => hex.slice(0, 7)

const TopMenuBar = lazy(() => import('src/shared/top-menu-bar/TopMenuBar'))
const MineFieldBoard = lazy(() => import('src/features/minefield/MineFieldBoard'))

export default function MainContainer() {
  const { mode } = useThemeMode()

  const isDark = mode === 'dark'

  const grainientProps: GrainientProps = useMemo(
    () => ({
      color1: stripAlpha(isDark ? '#3a3e48' : '#b7c4df'),
      color2: stripAlpha(isDark ? '#5c677b' : '#92a2bd'),
      color3: stripAlpha(isDark ? '#4d5f7b' : '#8392aa'),
      timeSpeed: 0.45,
      colorBalance: 0,
      grainAmount: 0.05,
      contrast: 1,
      gamma: 1,
      saturation: 1,
    }),
    [isDark]
  )

  return (
    <Suspense fallback={<FullPageLoadingSuspenseFallback />}>
      <MainLayout>
        <BackgroundRegion>
          <Grainient {...grainientProps} />
        </BackgroundRegion>
        <TopMenuBarRegion>
          <TopMenuBar />
        </TopMenuBarRegion>
        <ContentRegion>
          <MineFieldBoard />
        </ContentRegion>
      </MainLayout>
    </Suspense>
  )
}
