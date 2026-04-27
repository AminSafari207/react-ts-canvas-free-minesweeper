import { lazy, Suspense } from 'react'
import { BackgroundRegion, ContentRegion, MainLayout, TopMenuBarRegion } from 'src/shared/layouts/main'
import { FullPageLoadingSuspenseFallback } from 'src/shared/loading'
import { BackgroundGrainient } from './BackgroundGrainient'

const TopMenuBar = lazy(() => import('src/shared/top-menu-bar/TopMenuBar'))
const MineFieldBoard = lazy(() => import('src/features/minefield/components/MineFieldBoard'))

export default function MainContainer() {
  return (
    <Suspense fallback={<FullPageLoadingSuspenseFallback />}>
      <MainLayout>
        <BackgroundRegion>
          <BackgroundGrainient />
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
