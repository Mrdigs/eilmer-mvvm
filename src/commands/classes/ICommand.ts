export default interface ICommand<T> {
  canExecute: boolean
  execute(parameter: T): void
}
