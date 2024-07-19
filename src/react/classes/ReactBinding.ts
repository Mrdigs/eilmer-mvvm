import { Binding } from '../../bindings'
import IConverter from '../../converters/classes/IConverter'
import { Listener } from '../../properties/types'

import ReactBindingContext from './ReactBindingContext'

class ReactBinding<T = any, K = T> extends Binding<T, K> {

  constructor(viewModel: any, propertyName: string, converter: IConverter<T, K> = null, subscriber: Listener<T> = null) {
    super(viewModel, propertyName, converter, subscriber)
    super.setContext(new ReactBindingContext(viewModel, propertyName, this))
  }

}

export default ReactBinding
