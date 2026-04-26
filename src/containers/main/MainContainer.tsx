import { lazy, Suspense, useMemo } from 'react'
import { useThemeMode } from 'src/core/theme'
import { GrainientProps } from 'src/shared/background/grainient'
import Grainient from 'src/shared/background/grainient/Grainient'
import { BackgroundRegion, ContentRegion, MainLayout, TopMenuBarRegion } from 'src/shared/layouts/main'
import { FullPageLoadingSuspenseFallback } from 'src/shared/loading'
import { createBackgroundGrainientProps } from './grainient.theme'

const TopMenuBar = lazy(() => import('src/shared/top-menu-bar/TopMenuBar'))
const MineFieldBoard = lazy(() => import('src/features/minefield/components/MineFieldBoard'))

export default function MainContainer() {
  const { mode } = useThemeMode()

  const isDark = mode === 'dark'

  const grainientProps: GrainientProps = useMemo(() => createBackgroundGrainientProps(isDark), [isDark])

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
