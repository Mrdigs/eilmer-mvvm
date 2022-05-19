import Event from './Event'

export default class Events {

  static addEventListener(object, eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Event listeners must be functions')
    }
    if (!(object[eventName] instanceof Event)) {
      if (typeof object[eventName] === 'function') {
        const descriptor = getPropertyDescriptor(object, eventName)
        if (!descriptor.value?.event) {
          const event = new Event(object[eventName].bind(object))
          descriptor.value = event.invoke.bind(event)
          descriptor.value.event = event
          Object.defineProperty(object, eventName, descriptor)
          event.subscribe(listener)
        } else {
          const event = descriptor.value.event
          event.subscribe(listener)
        }
      }
    } else {
      return object[eventName].subscribe(listener)
    }
  }

  static removeEventListener(object, eventName, listener) {
    if (typeof listener === 'function') {
      if (!(object[eventName] instanceof Event)) {
        const descriptor = Object.getOwnPropertyDescriptor(object, eventName)
        if (descriptor.value?.event) {
          const event = descriptor.value.event
          event.unsubscribe(listener)
        }
      } else {
        object[eventName].unsubscribe(listener)
      }
    }
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
