import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { getSystemColorScheme } from './getSystemColorScheme'
import { ThemeStore } from './types/themeStoreTypes'

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeMode: getSystemColorScheme(),

      toggleThemeMode: (themeMode) => {
        set((s) => ({
          themeMode: themeMode ?? (s.themeMode === 'light' ? 'dark' : 'light'),
        }))
      },
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ themeMode: s.themeMode }),
      version: 1,
    }
  )
)
