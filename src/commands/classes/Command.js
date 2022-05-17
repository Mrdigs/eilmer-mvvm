import Properties from '../../properties'
import { NotImplementedException } from '../../exceptions'

export default class Command {

  execute() {
    throw new NotImplementedException()
  }

  get canExecute() {
    return true
  }

  canExecuteChanged() {
    Properties.notifyPropertyChanged(this, 'canExecute')
  }

  static from(receiver, execute) {
    return new (class extends Command {
      execute(...args) {
        return execute(...args)
      }
    })()
  }
}
