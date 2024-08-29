/**
 * Contains contextual information about a Binding.
 */
class BindingContext implements IBindingContext {
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
    this.attributes.set(key, value)
  }

  getAttribute<T>(key: any, defaultValue?: T): T {
    return (this.attributes.get(key) as T) || defaultValue
  }
}

export default BindingContext
