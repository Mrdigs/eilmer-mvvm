import Binding from './Binding'
import CommandBinding from '../../commands/classes/CommandBinding'
import { Listener } from '../../properties/types'
import { Converter } from '../../converters'
import IConverter from '../../converters/classes/IConverter'

class Binder<T extends object> {

  protected viewModel: T

  constructor(viewModel: T) {
    this.viewModel = viewModel
  }

  getViewModel(): T {
    return this.viewModel
  }

  /**
   *
   * @return {Binding}
   */
  bindProperty<T = any, K = T>(propertyName: string, converter: IConverter<T, K> = null, subscriber: Listener<T> = null): Binding<T, K> {
    return new Binding(this.viewModel, propertyName, converter, subscriber)
  }

  /**
   *
   * @return {CommandBinding}
   */
  bindCommand(commandName: string, converter: Converter = null, subscriber: Listener = null): CommandBinding {
    return new CommandBinding(this.viewModel, commandName, converter, subscriber)
  }

  // TODO: Actions (and Events?)
}

export default Binder
