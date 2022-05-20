import Binder from '../../bindings/classes/Binder'
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

  useCommand(commandName, converter) {
    return bindCommand(this.viewModel, commandName, converter)
  }

  useEvent(eventName, listener) {
    return bindEvent(this.viewModel, eventName, listener)
  }
}

export default ReactBinder
