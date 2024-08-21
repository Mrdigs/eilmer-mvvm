import ICommand from "./ICommand";
export default class Command<T> implements ICommand<T> {
    canExecute: boolean;
    execute(parameter: T): void;
    canExecuteChanged(): void;
    static from<T>(receiver: object, execute: (parameter: T) => void): {
        execute(parameter: T): void;
        canExecute: boolean;
        canExecuteChanged(): void;
    };
}
//# sourceMappingURL=Command.d.ts.map