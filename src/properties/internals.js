class PropertyAccessor {

  // TODO: Be careful, don't want a memory leak via reference to the value
  // I should probably revert the descriptor when the last listener is
  // removed. But still, this will do for now.


  constructor(object, propertyName, propertyDescriptor) {
    this._getter = propertyDescriptor.get?.bind(object)
    this._setter = propertyDescriptor.set?.bind(object)
    this._value = propertyDescriptor.value
    this._propertyName = propertyName
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

export function addPropertyChangeListener(object, property, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('Property change listeners must be functions')
  }

  const defaultDescriptor = { enumerable: false, configurable: true }
  const descriptor = getPropertyDescriptor(object, property) || defaultDescriptor

  /*
  const prototype = Object.getPrototypeOf(object)
  const protoTypeDescriptor = prototype ? Object.getOwnPropertyDescriptor(prototype, property) : null
  const objectDescriptor = Object.getOwnPropertyDescriptor(object, property)
  const descriptor = objectDescriptor || protoTypeDescriptor || defaultDescriptor
  */

  // SHOULD I ALWAYS USE OBJECT CREATE IN, SAY, BINDER?
  // WHICH WOULD THEN POTENTIALLY ALLOW ME TO JUST BIND TO ANYTHING?
  // I CAN POTENTIALLY EVEN DO AWAY WITH OBSERVABLE ENTIRELY - OR AT
  // LEAST, CHANGE IT TO WORK IN THAT WAY....
  // console.log('For', object, property,':',descriptor)

  if (!descriptor.set?.listeners) {
    const accessor = new PropertyAccessor(object, property, descriptor)
    descriptor.get = accessor.get.bind(accessor)
    descriptor.set = ((v, notify) => {
      const old = accessor.get(), result = accessor.set(v)
      if (descriptor === defaultDescriptor && !descriptor.enumerable) {
        descriptor.enumerable = true
        descriptor.configurable = false
        Object.defineProperty(object, property, descriptor)
      }
      if (v !== old || notify) {
        // TODO: I'm not sure if there's any purpose to this internal version
        notifyPropertyChangedInternal(object, property, notify)
        // notifyPropertyChanged(object, property, v, old)
      }
      return result
    })
    delete descriptor.value
    delete descriptor.writable
    if (descriptor !== defaultDescriptor) {
      descriptor.configurable = false
    } else {
      console.warn(`Binding to an non-existent property ${property}. This isn't a problem, but may not be intentional`)
    }
    descriptor.set.rev = 0
    descriptor.set.listeners = []
    Object.defineProperty(object, property, descriptor)
  }
  if (descriptor.set?.listeners) {
    descriptor.set.listeners.push(listener)
  }
  if (object[property]?.isObservable?.call()) {
    // Support for Observable properties. To avoid memory leaks,
    // the subscriber is the properties setter, so the property
    // gets set to itself and triggers the listener to be called
    object[property].subscribe(descriptor.set.bind(object, object[property], true))
  }
  return () => {
    removePropertyChangeListener(object, property, listener)
  }
}

export function removePropertyChangeListener(object, property, listener) {
  if (typeof listener === 'function') {
    const descriptor = Object.getOwnPropertyDescriptor(object, property)
    if (descriptor.set?.listeners) {
      const listeners = descriptor.set.listeners
      descriptor.set.listeners = listeners.filter(l => l !== listener)
    }
    listener.value = undefined
  }
}

export function notifyPropertyChanged(object, property) {
  notifyPropertyChangedInternal(object, property, true)
}

function notifyPropertyChangedInternal(object, property, regardless) {
  // If the descriptor doesn't exist then we shouldn't error
  const descriptor = Object.getOwnPropertyDescriptor(object, property)
  if (descriptor?.set?.listeners) {
    const value = object[property], rev = ++descriptor.set.rev
    descriptor.set.listeners.forEach((listener) => {

      // TODO: DOES THIS *ACTUALLY* SOLVE ANYTHING????

      if (regardless || listener.rev !== rev) {
        listener.rev = rev
        listener(value)
      }
    })
  }
}

function getPropertyDescriptor(object, property) {
  if (object) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(object, property)
    if (propertyDescriptor) {
      return propertyDescriptor
    } else {
      return getPropertyDescriptor(Object.getPrototypeOf(object), property)
    }
  }
}
