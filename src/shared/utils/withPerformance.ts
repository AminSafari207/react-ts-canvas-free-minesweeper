type WithPerformanceFn = <T extends () => any>(logName: string, fn: T) => ReturnType<T>

export const withPerformance: WithPerformanceFn = (logName, fn) => {
  const perf1 = performance.now()
  const result = fn()
  const perf2 = performance.now()

  console.log(`${logName}: `, perf2 - perf1)

  if (result) return result
}
