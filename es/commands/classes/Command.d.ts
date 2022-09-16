export default class Command {
    static from(receiver: any, execute: any): {
        execute(...args: any[]): any;
        readonly canExecute: boolean;
        canExecuteChanged(): void;
    };
    execute(): void;
    get canExecute(): boolean;
    canExecuteChanged(): void;
}
//# sourceMappingURL=Command.d.ts.map