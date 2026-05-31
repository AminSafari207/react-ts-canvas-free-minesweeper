export interface LongPressHanlders {
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: () => void
  onPointerCancel: () => void
  onPointerLeave: () => void
  onClickCapture: (e: React.MouseEvent) => void
}

export type UseCellLongPresOptions = {
  delay?: number
  disabled?: boolean
}

export type UseCellLongPress = (onLongPress: () => void, options?: UseCellLongPresOptions) => LongPressHanlders | undefined
