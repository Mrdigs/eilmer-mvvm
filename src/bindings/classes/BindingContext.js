/**
 * Contains contextual information about a Binding.
 */
class BindingContext {

  viewModel = undefined
  propertyName = undefined

  /**
   *
   */
  attributes = undefined

  /**
   * @hideconstructor
   */
  constructor(viewModel, propertyName) {
    // TODO: Hmmm, why is it that I can *still* write these properties?
    Object.defineProperty(this, 'viewModel', { value: viewModel, writeable: false, configurable: false })
    Object.defineProperty(this, 'propertyName', { value: propertyName, writeable: false, configurable: false })
    Object.defineProperty(this, 'attributes', { value: {}, writeable: false, configurable: false })
    // TODO: Hmmm, I like sealing it, but it makes it
    // non extensible by a subclass.....
    // Object.seal(this)
  }

  setAttribute(key, value) {
    this.attributes[key] = value
  }

  getAttribute(key) {
    return this.attributes[key]
  }
}

export default BindingContext
