export default class PropertyAccessor {

  private getter: () => any
  private setter: (v: any) => void
  private value = new WeakMap()

  constructor(object: object, propertyDescriptor: PropertyDescriptor) {
    this.value.set(object || this, propertyDescriptor.value)
    this.getter = propertyDescriptor.get
    this.setter = propertyDescriptor.set
  }

  set(object: object, value: any) {
    if (this.setter) {
      return this.setter.call(object, value)
    } else {
      this.value.set(object || this, value)
      return value
    }
  }

  get(object: object) {
    if (this.getter) {
      return this.getter.call(object)
    } else {
      return this.value.get(object || this)
    }
  }
}
