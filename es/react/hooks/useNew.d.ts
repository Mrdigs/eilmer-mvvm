export default function useNew<T extends new (...args: any[]) => any>(instanceClass: T, ...constructorArgs: ConstructorParameters<T>): InstanceType<T>;
//# sourceMappingURL=useNew.d.ts.map