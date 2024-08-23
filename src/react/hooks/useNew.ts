import { useMemo } from "react"

export default function useNew<T extends new (...args: any[]) => any>(
  instanceClass: T,
  ...constructorArgs: ConstructorParameters<T>
): InstanceType<T> {
  return useMemo(() => {
    return new instanceClass(...constructorArgs)
  }, [instanceClass, ...constructorArgs])
}
