import { Button, Stack, styled, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const ErrorFallbackWrapperStack = styled(Stack)({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
})

const GlobalErrorFallback = () => {
  const reloadOnClick = () => {
    window.location.reload()
  }

  return (
    <ErrorFallbackWrapperStack spacing={6}>
      <Typography variant="h1" fontWeight={300}>
        App screwed up!
      </Typography>
      <Button variant="contained" color="secondary" onClick={reloadOnClick}>
        Reload App
      </Button>
    </ErrorFallbackWrapperStack>
  )
}

export const GlobalErrorBoundary = ({ children }: PropsWithChildren) => {
  return <ErrorBoundary fallbackRender={GlobalErrorFallback}>{children}</ErrorBoundary>
}
