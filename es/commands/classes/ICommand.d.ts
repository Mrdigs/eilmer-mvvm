export default interface ICommand<T> {
    canExecute: boolean;
    execute(parameter: T): void;
}
//# sourceMappingURL=ICommand.d.ts.map