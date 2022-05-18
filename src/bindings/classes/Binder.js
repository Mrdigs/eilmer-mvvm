import Binding from './Binding'
import CommandBinding from '../../commands/classes/CommandBinding'

class Binder {

  #viewModel = undefined

  constructor(viewModel) {
    this.#viewModel = viewModel
  }

  get viewModel() {
    return this.#viewModel
  }

  /**
   *
   * @return {Binding}
   */
  bindProperty(propertyName, converter = null, subscriber = null) {
    return new Binding(this.#viewModel, propertyName, converter, subscriber)
  }

  /**
   *
   * @return {CommandBinding}
   */
  bindCommand(commandName, converter = null, subscriber = null) {
    return new CommandBinding(this.#viewModel, commandName, converter, subscriber)
  }

  // TODO: Actions (and Events?)
}

export default Binder
