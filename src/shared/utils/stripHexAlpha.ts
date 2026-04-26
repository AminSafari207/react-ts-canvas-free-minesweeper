export const stripHexAlpha = (hex: string): string => {
  if (/^#([0-9a-f]{8})$/i.test(hex)) return hex.slice(0, 7)
  return hex
}
