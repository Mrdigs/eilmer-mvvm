import { Binder } from '../../bindings'
import { bindProperty, bindBinding, bindCommand, bindEvent } from '../internals'

class ReactBinder extends Binder {

  constructor(viewModel) {
    super(viewModel)
  }

  useProperty(propertyName, converter) {
    return bindProperty(this.viewModel, propertyName, converter)
  }

  useBinding(propertyName, converter) {
    return bindBinding(this.viewModel, propertyName, converter)
  }

  useCommand(command, converter) {
    // TODO: Change to commandName, and elsewhere
    return bindCommand(this.viewModel, command, converter)
  }

  // TODO: Do I want to allow a converter here?
  useEvent(eventName) {
    return bindEvent(this.viewModel, eventName)
  }
}

export default ReactBinder
