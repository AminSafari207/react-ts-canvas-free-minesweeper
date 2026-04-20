import { CreateBitmap } from './types/bitmapTypes'

export const createBitmap: CreateBitmap = (size, options) => {
  const bits = options?.bits ?? 8
  const data = bits === 8 ? new Uint8Array(size) : bits === 16 ? new Uint16Array(size) : new Uint32Array(size)
  const maxValue = bits === 8 ? 255 : bits === 16 ? 65535 : 4294967295

  const assertIndex = (index: number) => {
    if (index < 0 || index >= data.length || !Number.isInteger(index)) {
      throw new RangeError(`Bitmap index out of bounds: ${index}`)
    }
  }

  const assertValue = (value: number) => {
    if (!Number.isInteger(value)) {
      throw new TypeError(`Bitmap value must be an integer: ${value}`)
    }

    if (value < 0 || value > maxValue) {
      throw new RangeError(`Bitmap value ${value} exceeds ${bits}-bit range (0-${maxValue})`)
    }
  }

  return {
    has(index) {
      assertIndex(index)
      return data[index] !== 0
    },

    get(index) {
      assertIndex(index)
      return data[index]
    },

    set(index, value) {
      assertIndex(index)
      assertValue(value)
      data[index] = value
    },

    unset(index) {
      assertIndex(index)
      data[index] = 0
    },

    toggle(index) {
      assertIndex(index)

      const value = data[index]

      if (value !== 0 && value !== 1) {
        throw new Error(`Bitmap toggle requires 0 or 1 but found ${value}`)
      }

      data[index] = data[index] === 0 ? 1 : 0
    },

    clear(limit) {
      if (limit === undefined) data.fill(0)
      else data.fill(0, 0, limit)
    },
  }
}
