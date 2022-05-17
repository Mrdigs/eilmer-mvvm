import { Binder } from '../../bindings'
import { bindProperty, bindBinding, bindCommand } from '../internals'

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
    return bindCommand(this.viewModel, command, converter)
  }

}

export default ReactBinder
