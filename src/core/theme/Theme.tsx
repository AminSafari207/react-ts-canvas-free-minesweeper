import { CacheProvider, EmotionCache } from '@emotion/react'
// @ts-ignore
import '@fontsource-variable/nunito-sans'
// @ts-ignore
import '@fontsource/roboto/300.css'
// @ts-ignore
import '@fontsource/roboto/400.css'
// @ts-ignore
import '@fontsource/roboto/500.css'
// @ts-ignore
import '@fontsource/roboto/600.css'
// @ts-ignore
import '@fontsource/roboto/700.css'

import { alpha, createTheme, CssBaseline, PaletteOptions, responsiveFontSizes, ThemeOptions, ThemeProvider } from '@mui/material'
import { PropsWithChildren, useMemo } from 'react'
import { useThemeStore } from 'src/shared/store'
import { useShallow } from 'zustand/shallow'

createTheme({ typography: {} })

export type ThemeProps = PropsWithChildren<{ emotionCache?: EmotionCache }>

export function Theme({ children, emotionCache }: ThemeProps) {
  const themeMode = useThemeStore(useShallow((s) => s.themeMode))

  const palette: PaletteOptions = useMemo(
    () => ({
      primary: {
        main: themeMode === 'dark' ? '#648DE5' : '#3d58d3',
      },
      secondary: {
        main: '#B1C8FA',
      },
      error: {
        main: '#E01A4F',
      },
      warning: {
        main: '#F78400',
      },
      success: {
        main: '#00AC6B',
      },
      background: { default: themeMode === 'dark' ? '#242424' : '#d3d3d3ff', paper: themeMode === 'dark' ? '#2d2d2d' : '#c2c2c2ff' },
      common:
        themeMode === 'dark'
          ? {
              black: '#FFFFFF',
              white: '#242424',
            }
          : {
              white: '#FFFFFF',
              black: '#242424',
            },
      paper: themeMode === 'dark' ? '#2d2d2d' : '#b8b8b8ff',
      mode: themeMode,
    }),
    [themeMode]
  )

  const fontFamily = [
    'Roboto',
    'Nunito Sans Variable',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(',')

  const typography: ThemeOptions['typography'] = {
    fontFamily,
    h1: { fontSize: '55px', fontWeight: 600, lineHeight: 1.35, letterSpacing: '-2.75px' },
    h2: { fontSize: '40px', fontWeight: 600, lineHeight: 1.35, letterSpacing: '-2px' },
    h3: { fontSize: '30px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-1.5px' },
    h4: { fontSize: '25px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-1.25px' },
    h5: { fontSize: '20px', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-1px' },
    h6: { fontSize: '18px', fontWeight: 400, lineHeight: 1.35 },
    body1: { fontSize: '16px', fontWeight: 400, lineHeight: 1.35 },
    body2: { fontSize: '14px', fontWeight: 400, lineHeight: 1.35 },
    caption: { fontSize: '13px', fontWeight: 300, lineHeight: 1.35 },
    subtitle1: { fontSize: '12px', fontWeight: 300, lineHeight: 1.35 },
    button: {
      fontSize: '14px',
      fontWeight: 600,
      fontFamily,
    },
  }

  const theme = useMemo(() => {
    const base = createTheme({
      palette,
      typography,
      spacing: 8,
      // transitions: { duration: { long: 500, longer: 1000, longest: 2000 } },
      components: {
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              background: palette.background?.default,
              color: palette.common?.black,
              fontSize: 14,
              boxShadow:
                'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
            },
            arrow: { color: palette.background?.default },
          },
        },
        MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
        MuiTab: { styleOverrides: { root: { textTransform: 'none' } } },
        MuiBackdrop: { styleOverrides: { root: { backgroundColor: alpha('#000', 0.7) } } },

        MuiCssBaseline: {
          styleOverrides: {
            html: { scrollBehavior: 'smooth' },
            'body > #root': {
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              height: '100%',
              minHeight: '100vh',
              width: '100%',
              maxWidth: '100%',
              margin: 0,
              padding: 0,
            },
            code: { fontFamily: 'monospace' },
            '*': { scrollbarWidth: 'thin', scrollbarColor: `#696767 rgba(0,0,0,0) transparent` },
            '*::-webkit-scrollbar': { width: 8, height: 8 },
            '*::-webkit-scrollbar-track': { background: 'transparent' },
            '*::-webkit-scrollbar-thumb': { backgroundColor: '#696767 rgba(0,0,0,0)', borderRadius: 4 },
          },
        },
      },
    })

    return responsiveFontSizes(base)
  }, [themeMode])

  const themeContainer = (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  )

  return emotionCache ? <CacheProvider value={emotionCache}>{themeContainer}</CacheProvider> : themeContainer
}
