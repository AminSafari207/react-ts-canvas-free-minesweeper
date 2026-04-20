export interface Bitmap {
  has(index: number): boolean
  get(index: number): number
  set(index: number, value: number): void
  unset(index: number): void
  toggle(index: number): void
  clear(limit?: number): void
}

interface CreateBitmapOptions {
  bits?: 8 | 16 | 32
}

export type CreateBitmap = (size: number, options?: CreateBitmapOptions) => Bitmap
