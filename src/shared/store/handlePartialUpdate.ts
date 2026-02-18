import { StateUpdater } from 'src/shared/types'

export const handlePartialUpdate = <TState>(state: TState, partialUpdate: StateUpdater<TState>): TState => {
  let newPartial: Partial<TState>

  if (typeof partialUpdate === 'function') {
    newPartial = partialUpdate(state)
  } else {
    newPartial = partialUpdate
  }

  return {
    ...state,
    ...newPartial,
  } as TState
}
