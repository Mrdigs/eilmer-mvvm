import { Binding } from '../../bindings'

import ReactBindingContext from './ReactBindingContext'

class ReactBinding extends Binding {

  #context = undefined

  constructor(viewModel, propertyName, converter, subscriber) {
    super(viewModel, propertyName, converter, subscriber)
    this.#context = new ReactBindingContext(viewModel, propertyName)
  }

  getContext() {
    return this.#context
  }

}

export default ReactBinding
