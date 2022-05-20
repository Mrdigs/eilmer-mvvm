import * as Internals from '../internals'
import { NotImplementedException } from '../../exceptions'
import Commands from '../../commands'

export default class ViewModel {

  // TODO: Can I add a constructor that prevents this
  // class from being directly instantiated?

  useProperty(property, converter = null) {
    throw new NotImplementedException()
  }

  useBinding(property, converter = null) {
    throw new NotImplementedException()
  }

  useCommand(command, converter = null, ...args) {
    throw new NotImplementedException()
  }

  dispatchCommand(command, ...args) {
    throw new NotImplementedException()
  }

  registerActionHandler() {
    // TODO: Ok so now I have action support, I need to
    // implement this...
    throw new NotImplementedException()
  }

  static from(object) {
    return new (class extends ViewModel {
      useProperty(propertyName, converter = null) {
        return Internals.bindProperty(object, propertyName, converter)
      }
      useBinding(propertyName, converter = null) {
        return Internals.bindBinding(object, propertyName, converter)
      }
      useCommand(commandName, converter = null, ...args) {
        return Internals.bindCommand(object, commandName, converter, ...args)
      }
      useEvent(eventName, listener = null) {
        return bindEvent.bindEvent(object, eventName, listener)
      }
      // TODO: Is this relevant anymore?
      dispatchCommand(commandName, ...args) {
        return Internals.bindCommand(object, commandName, ...args)()
      }
    })()
  }
}
