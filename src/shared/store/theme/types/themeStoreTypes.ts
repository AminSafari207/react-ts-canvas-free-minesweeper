export type ThemeMode = 'dark' | 'light'

export interface ThemeStore {
  themeMode: ThemeMode

  toggleThemeMode: (themeMode?: ThemeMode) => void
}
