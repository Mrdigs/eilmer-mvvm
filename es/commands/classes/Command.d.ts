export default class Command<T> {
    canExecute: boolean;
    execute(...args: any[]): T;
    canExecuteChanged(): void;
    static from<T>(receiver: object, execute: (...args: any[]) => T): {
        execute(...args: any[]): T;
        canExecute: boolean;
        canExecuteChanged(): void;
    };
}
//# sourceMappingURL=Command.d.ts.map