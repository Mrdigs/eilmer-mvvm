import Properties from "../../properties"
import { NotImplementedException } from "../../exceptions"
import ICommand from "./ICommand"

export default class Command<T> implements ICommand<T> {
  canExecute: boolean = true

  execute(parameter: T): void {
    throw new NotImplementedException()
  }

  canExecuteChanged() {
    Properties.notifyPropertyChanged(this, "canExecute")
  }

  static from<T>(receiver: object, execute: (parameter: T) => void) {
    return new (class extends Command<T> {
      execute(parameter: T): void {
        return execute.apply(receiver, parameter)
      }
    })()
  }
}
