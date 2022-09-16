import Binder from '../../bindings/classes/Binder'
import { bindProperty, bindBinding, bindCommand, bindExpression, bindEvent } from '../internals'

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

  useCommand(commandName, converter, listener) {
    return bindCommand(this.viewModel, commandName, converter, listener)
  }

  useExpression(expression) {
    return bindExpression(this.viewModel, expression)
  }

  useEvent(eventName, listener) {
    return bindEvent(this.viewModel, eventName, listener)
  }
}

export default ReactBinder
