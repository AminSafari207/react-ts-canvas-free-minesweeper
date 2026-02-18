import { lazy } from 'react'
import { Providers } from './shared/providers'

const MainContainer = lazy(() => import('src/containers/main/MainContainer'))

export const App = () => {
  return (
    <Providers>
      <MainContainer />
    </Providers>
  )
}
