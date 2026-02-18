import { ThemeContextRealValues } from 'src/core/theme'
import { StorageKeys } from 'src/shared/constants'

function getStorageObject<ReturnType = unknown>(key: StorageKeys) {
  const returnDataString = window.localStorage.getItem(key)
  if (returnDataString) {
    try {
      return JSON.parse(returnDataString) as ReturnType
    } catch {
      return undefined
    }
  }
}

function setStorageObject<ObjectType>(key: StorageKeys, obj?: ObjectType) {
  if (obj) {
    window.localStorage.setItem(key, JSON.stringify(obj))
  } else {
    window.localStorage.removeItem(key)
  }
}

export const getThemeMode = () => getStorageObject<ThemeContextRealValues>(StorageKeys.themeMode)

export const setThemeMode = (themeMode?: ThemeContextRealValues) => setStorageObject(StorageKeys.themeMode, themeMode)
