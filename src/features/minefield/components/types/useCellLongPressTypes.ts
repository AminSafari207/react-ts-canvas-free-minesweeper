export interface LongPressHanlders {
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: () => void
  onPointerCancel: () => void
  onPointerLeave: () => void
  onClickCapture: (e: React.MouseEvent) => void
}
