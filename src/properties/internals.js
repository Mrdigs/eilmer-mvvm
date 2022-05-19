// ALSO MAKE IT ALL A CLASS WITH STATIC METHODS

// AND PERHAPS IT CAN BE EXTENDED WITH AN ALLOW
// PATHS BOOL IN THE CONSTRUCTOR?

class PropertyAccessor {

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

function getTargetAndPropertyName(object, propertyName) {
  let target = object, targetPropertyName = propertyName
  if (typeof propertyName === 'string' && propertyName.includes('.')) {
    const parts = propertyName.split('.'), length = parts.length - 1
    for (var i = 0; i < length; i++) {
      if (parts[i].length) target = target[parts[i]]
      if (typeof target === 'undefined') {
        throw new Error('Cannot bind to a property of an undefined object')
      }
    }
    targetPropertyName = parts[length]
  } else if (typeof target === 'undefined') {
    throw new Error('Cannot bind to a property of an undefined object')    
  }
  return [ target, targetPropertyName ]
}

export function addPropertyChangeListener(target, propertyName, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('Property change listeners must be functions')
  }

  const [ object, property ] = getTargetAndPropertyName(target, propertyName)
  const defaultDescriptor = { enumerable: false, configurable: true }
  const descriptor = getPropertyDescriptor(object, property) || defaultDescriptor

  // SHOULD I ALWAYS USE OBJECT CREATE IN, SAY, BINDER?
  // WHICH WOULD THEN POTENTIALLY ALLOW ME TO JUST BIND TO ANYTHING?
  // I CAN POTENTIALLY EVEN DO AWAY WITH OBSERVABLE ENTIRELY - OR AT
  // LEAST, CHANGE IT TO WORK IN THAT WAY....

  if (!descriptor.set?.listeners) {
    const accessor = new PropertyAccessor(object, descriptor)
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

export function notifyPropertyChanged(target, propertyName) {
  const [ object, property ] = getTargetAndPropertyName(target, propertyName)
  notifyPropertyChangedInternal(object, property, true)
}

export function getPropertyValue(target, propertyName) {
  const [ object, property ] = getTargetAndPropertyName(target, propertyName)
  return object[property]
}

export function setPropertyValue(target, propertyName, value) {
  const [ object, property ] = getTargetAndPropertyName(target, propertyName)
  object[property] = value
}

function notifyPropertyChangedInternal(target, propertyName, regardless) {
  const [ object, property ] = getTargetAndPropertyName(target, propertyName)
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
