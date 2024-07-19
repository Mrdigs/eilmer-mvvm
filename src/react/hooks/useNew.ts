import { useMemo } from "react"

export default function useNew<T>(
  instanceClass: new (...args: any[]) => T,
  ...constructorArgs: any[]
): T {
  return useMemo(() => {
    const InstanceFactory = instanceClass.bind.apply(instanceClass, [
      instanceClass,
      ...constructorArgs,
    ])
    return new InstanceFactory()
  }, [instanceClass, ...constructorArgs])
}
