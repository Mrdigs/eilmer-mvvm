import Binder from '../../bindings/classes/Binder'
import IConverter from '../../converters/classes/IConverter'
import bindBinding from '../hooks/useBinding'
import bindProperty from '../hooks/useProperty'
import bindExpression from '../hooks/useExpression'
import bindCommand from '../hooks/useCommand'
import bindEvent from '../hooks/useEvent'

class ReactBinder<T extends object> extends Binder<T> {

  constructor(viewModel: T) {
    super(viewModel)
  }

  /**
   * 
   * @deprecated
   */
  useProperty<T = any, K = T>(propertyName: string, converter: IConverter<T, K> = null) {
    return bindProperty(this.viewModel, propertyName, converter)
  }

  useBinding<T = any, K = T>(propertyName: string, converter: IConverter<T, K> = null) {
    return bindBinding(this.viewModel, propertyName, converter)
  }

  useCommand(commandName: string, converter) {
    return bindCommand(this.viewModel, commandName, converter)
  }

  useExpression(expression: string) {
    return bindExpression(this.viewModel, expression)
  }

  useEvent(eventName: string, listener) {
    return bindEvent(this.viewModel, eventName, listener)
  }

}

export default ReactBinder
