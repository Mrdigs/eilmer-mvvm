import Properties from "../../properties";
import { NotImplementedException } from "../../exceptions";

export default class Command<T> {
  canExecute: boolean = true;

  execute(...args: any[]): T {
    throw new NotImplementedException();
  }

  /*
  get canExecute() {
    return true
  }
  */

  canExecuteChanged() {
    Properties.notifyPropertyChanged(this, "canExecute");
  }

  static from<T>(receiver: object, execute: (...args: any[]) => T) {
    return new (class extends Command<T> {
      execute(...args: any[]): T {
        return execute.apply(receiver, args);
      }
    })();
  }
}
