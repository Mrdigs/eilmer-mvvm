import PropertyAccessor from './PropertyAccessor'
import Event from '../../events/classes/Event'
import { Listener } from '../types'
import INotifyPropertyChanged from './INotifyPropertyChanged'

export default class Properties {

  static addPropertyChangeListener(target: object, propertyName: string, listener: Listener) {
    const [ object, property ] = getTargetAndPropertyName(target, propertyName)
    const defaultDescriptor = { enumerable: false, configurable: true }
    const descriptor : PropertyDescriptor | any = getPropertyDescriptor(object, property) || defaultDescriptor

    if (!descriptor.set?.listeners) {
      const accessor = new PropertyAccessor(object, descriptor)
      descriptor.get = (function () {
        return accessor.get(this)
      })
      descriptor.set = (function (v: any, notify: boolean) {
        const old = accessor.get(this), result = accessor.set(this, v)
        if (descriptor === defaultDescriptor && !descriptor.enumerable) {
          descriptor.enumerable = true
          descriptor.configurable = false
          Object.defineProperty(object, property, descriptor)
        }
        if (v !== old || notify) {
          // TODO: I'm not sure if there's any purpose to this internal version 
          // It does handle the propertyChangeSupport stuff, so maybe. I depends 
          // whether I want to actually handle that, plus the whole revision thing.
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
        console.warn(`[Eilmer] Binding to an non-existent property ${property}. This isn't a problem, but may not be intentional`)
      }
      descriptor.set.rev = 0
      // TODO: Is there some way of not keeping a strong 
      // reference to each listener?
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

      // TODO: Oh it's my own Observable class. What was that for again?
      // Needs visiting.

      object[property].subscribe(descriptor.set.bind(object, object[property], true))
    }
    return () => {
      Properties.removePropertyChangeListener(object, property, listener)
    }
  }

  static removePropertyChangeListener(target: object, propertyName: string, listener: Listener) {
    //if (typeof listener === 'function') {
      const [ object, property ] = getTargetAndPropertyName(target, propertyName)
      const descriptor = Object.getOwnPropertyDescriptor(object, property)
      const set = descriptor.set as unknown as {listeners: Listener[]}
      if (set?.listeners) {
        const listeners = set.listeners
        set.listeners = listeners.filter(l => l !== listener)
      }
      // TODO: I need to track down why this is here. What is it used for,
      // if anything? Right now, this is a terrible hack to cast it 
      // as any. Need to check whether this is actually referenced anywhere
      // (listener as any).value = undefined
      // listener.value = undefined
    //}
  }

  static notifyPropertyChanged(target: object, propertyName: string) {
    const [ object, property ] = getTargetAndPropertyName(target, propertyName)
    notifyPropertyChangedInternal(object, property, true)
  }

  // TODO: Is this useful? WHere is it used?
  static getPropertyValue(target: object, propertyName: string) {
    const [ object, property ] = getTargetAndPropertyName(target, propertyName)
    return object[property]
  }

  // TODO: Is this useful? WHere is it used?
  static setPropertyValue(target, propertyName, value) {
    const [ object, property ] = getTargetAndPropertyName(target, propertyName)
    object[property] = value
  }

}

function notifyPropertyChangedInternal(targetObject: object, propertyName: string, regardless: boolean) {
  const [ object, property ] = getTargetAndPropertyName(targetObject, propertyName)
  // If the descriptor doesn't exist then we shouldn't error
  const descriptor = Object.getOwnPropertyDescriptor(object, property)
  const set = descriptor.set as unknown as {listeners: Listener[], rev: number}
  if (set?.listeners) {
    const value = object[property], rev = ++set.rev
    set.listeners.forEach((listener) => {

      // TODO: DOES THIS *ACTUALLY* SOLVE ANYTHING????
      // TODO: Why did I even add this in anyway? I think it's so that
      // I don't have to keep track of the last value that the listener
      // has received for memory leak purposes. I'll keep it in anyway 
      // for now and revisit it later
      const revision = listener as unknown as {rev: number}
      if (regardless || revision.rev !== rev) {
        revision.rev = rev
        listener(value)
      }
    })
    
    // Automatically triggers the onPropertyChanged event for this property
    // if the target object supports receiving that event.
    if (canNotifyPropertyChanged(object)) {
      if (object.onPropertyChanged instanceof Event) {
        object.onPropertyChanged.trigger(property)
      } else {
        object.onPropertyChanged(property)
      }
    }
  }
}

function getPropertyDescriptor(targetObject: object, propertyName: string) {
  if (targetObject) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(targetObject, propertyName)
    if (propertyDescriptor) {
      return propertyDescriptor
    } else {
      return getPropertyDescriptor(Object.getPrototypeOf(targetObject), propertyName)
    }
  }
}

function getTargetAndPropertyName(targetObject: object, propertyName: string): [object, string] {
  let target = targetObject, targetPropertyName = propertyName
  // TODO: Should I allow this? Is there any need, especially when I'm looking 
  // at including expression support. Actually it's neccessary *FOR* expression support!!!!
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

function canNotifyPropertyChanged(arg: object): arg is INotifyPropertyChanged {
  return (arg as INotifyPropertyChanged).onPropertyChanged !== undefined;
}