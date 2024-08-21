import Command from "./classes/Command";
export type CommandOrFunction<T> = Command<T> | ((param: T) => void);
export type CommandOf<VM, T> = {
    [K in keyof VM]: VM[K] extends CommandOrFunction<T> ? K : never;
}[keyof VM];
export type InferCommandOrFunctionType<V> = V extends Command<infer T> ? T : V extends (param: infer T) => void ? T : never;
//# sourceMappingURL=types.d.ts.map