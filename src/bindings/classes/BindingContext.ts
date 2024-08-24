/**
 * Contains contextual information about a Binding.
 */
class BindingContext {
  readonly viewModel: object
  readonly propertyName: string
  readonly attributes = new Map()

  /**
   * @hideconstructor
   */
  constructor(viewModel: object, propertyName: string) {
    this.viewModel = viewModel
    this.propertyName = propertyName
  }

  setAttribute(key: any, value: any) {
    this.attributes[key] = value
  }

  getAttribute(key: any) {
    return this.attributes[key]
  }
}

export default BindingContext
