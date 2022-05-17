import { BindingContext } from '../../bindings'

class ReactBindingContext extends BindingContext {

  component = undefined
  componentProperty = undefined

  // I really need a nicer way of doing this, BUT
  // THIS WILL DO FOR THE TIME BEING
  setComponentPropertiesHandler = () => false

  constructor(viewModel, propertyName) {
    super(viewModel, propertyName)
  }

  setComponentProperties(properties) {
    return this.setComponentPropertiesHandler(properties)
  }
}

export default ReactBindingContext
