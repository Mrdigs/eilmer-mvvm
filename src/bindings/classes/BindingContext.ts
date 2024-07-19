import Binding from "./Binding"

/**
 * Contains contextual information about a Binding.
 */
class BindingContext {

  readonly viewModel: object
  readonly propertyName: string
  readonly binding: Binding
  readonly attributes = {}

  /**
   * @hideconstructor
   */
  constructor(viewModel: object, propertyName: string, binding: Binding) {
    this.viewModel = viewModel
    this.propertyName = propertyName
    this.binding = binding
  }

  setAttribute(key: string, value: any) {
    this.attributes[key] = value
  }

  getAttribute(key: string) {
    return this.attributes[key]
  }
}

export default BindingContext
