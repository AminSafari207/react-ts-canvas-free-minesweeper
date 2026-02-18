import { Box, styled } from '@mui/material'
import { ComponentType, PropsWithChildren } from 'react'
import { groupChildrenByType } from 'src/shared/utils'

// typescript only allows string when it defined at `JSX.IntrinsicElements`
export const BackgroundRegion = 'BackgroundRegion' as unknown as ComponentType<PropsWithChildren>
export const TopMenuBarRegion = 'TopMenuBarRegion' as unknown as ComponentType<PropsWithChildren>
export const ContentRegion = 'ContentRegion' as unknown as ComponentType<PropsWithChildren>

const regions = [BackgroundRegion, TopMenuBarRegion, ContentRegion]

export type MainLayoutProps = PropsWithChildren

const MainWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  overflowY: 'auto',
  overflowX: 'hidden',
  right: 0,
  top: 0,
  background: theme.palette.background.default,
  width: '100vw',
  height: '100vh',
  maxWidth: '100% !important',
}))

const BackgroundWrapper = styled(Box)({
  position: 'absolute',
  inset: 0,
})

const TopMenuBarWrapper = styled(Box)({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  padding: '24px 20px',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 2,
  pointerEvents: 'none',
  touchAction: 'none',
})

const ContentWrapper = styled(Box)({
  position: 'relative',
  minHeight: '100%',
  display: 'flex',
  flex: '1 0 auto',
  flexGrow: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  zIndex: 1,
})

export function MainLayout({ children }: MainLayoutProps) {
  const map = groupChildrenByType(children, regions)

  const backgroundChild = map.get(BackgroundRegion)
  const topMenuBarChild = map.get(TopMenuBarRegion)
  const contentChild = map.get(ContentRegion)

  return (
    <MainWrapper>
      <BackgroundWrapper>{backgroundChild}</BackgroundWrapper>
      <TopMenuBarWrapper>{topMenuBarChild}</TopMenuBarWrapper>
      <ContentWrapper>{contentChild}</ContentWrapper>
    </MainWrapper>
  )
}
