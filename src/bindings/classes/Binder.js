import Binding from './Binding'

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
  bindProperty(propertyName, converter, subscriber) {
    return new Binding(this.#viewModel, propertyName, converter, subscriber)
  }

  // TODO: Command
}

export default Binder
