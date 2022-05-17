import * as Properties from '../internals'

/**
 *
 *
 * @abstract
 */
class NotifyPropertyChanged {

  /**
   * Notifies any listeners for a given property that it has changed.
   */
  notifyChanged() {
    Array.prototype.slice.call(arguments).forEach(property => {
      Properties.notifyPropertyChanged(this, property)
    })
  }

}

export default NotifyPropertyChanged
