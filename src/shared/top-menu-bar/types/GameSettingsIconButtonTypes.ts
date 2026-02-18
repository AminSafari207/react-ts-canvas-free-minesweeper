export interface SliderConfig {
  value: number
  label: string
  min: number
  max: number
  onChange: (event: Event, value: number) => void
}
