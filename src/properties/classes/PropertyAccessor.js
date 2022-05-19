export default class PropertyAccessor {

  // TODO: Be careful, don't want a memory leak via reference to the value
  // I should probably revert the descriptor when the last listener is
  // removed. But still, this will do for now.

  constructor(object, propertyDescriptor) {
    this._getter = propertyDescriptor.get?.bind(object)
    this._setter = propertyDescriptor.set?.bind(object)
    this._value = propertyDescriptor.value
  }

  set(value) {
    if (this._setter) {
      return this._setter(value)
    } else {
      this._value = value
      return value
    }
  }

  get() {
    if (this._getter) {
      return this._getter()
    } else {
      return this._value
    }
  }
}
