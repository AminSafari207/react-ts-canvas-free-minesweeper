import { ThemeContextRealValues } from 'src/core/theme'
import { storageKeys } from 'src/shared/constants'

function getStorageObject<ReturnType = unknown>(key: storageKeys) {
  const returnDataString = window.localStorage.getItem(key)
  if (returnDataString) {
    try {
      return JSON.parse(returnDataString) as ReturnType
    } catch {
      return undefined
    }
  }
}

function setStorageObject<ObjectType>(key: storageKeys, obj?: ObjectType) {
  if (obj) {
    window.localStorage.setItem(key, JSON.stringify(obj))
  } else {
    window.localStorage.removeItem(key)
  }
}

export const getThemeMode = () => getStorageObject<ThemeContextRealValues>(storageKeys.themeMode)

export const setThemeMode = (themeMode?: ThemeContextRealValues) => setStorageObject(storageKeys.themeMode, themeMode)
