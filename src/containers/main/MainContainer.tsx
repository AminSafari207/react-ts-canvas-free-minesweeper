import { lazy } from 'react'
import { BackgroundRegion, ContentRegion, MainLayout, TopMenuBarRegion } from 'src/shared/layouts/main'
import { BackgroundGrainient } from './BackgroundGrainient'

const TopMenuBar = lazy(() => import('src/shared/top-menu-bar/TopMenuBar'))
const MinefieldBoard = lazy(() => import('src/features/minefield/components/MinefieldBoard'))

export default function MainContainer() {
  return (
    <MainLayout>
      <BackgroundRegion>
        <BackgroundGrainient />
      </BackgroundRegion>
      <TopMenuBarRegion>
        <TopMenuBar />
      </TopMenuBarRegion>
      <ContentRegion>
        <MinefieldBoard />
      </ContentRegion>
    </MainLayout>
  )
}
