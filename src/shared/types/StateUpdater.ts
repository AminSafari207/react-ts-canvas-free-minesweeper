export type StateUpdater<TState> = Partial<TState> | ((prevState: TState) => Partial<TState>)
