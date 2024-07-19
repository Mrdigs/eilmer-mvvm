import INotifyPropertyChanged from './INotifyPropertyChanged'
import Properties from './Properties'

/**
 *
 *
 * @abstract
 */
abstract class NotifyPropertyChanged implements INotifyPropertyChanged {
  /**
   * Notifies any listeners for a given property that it has changed.
   */
  notifyPropertyChanged(propertyName: string) {
    Properties.notifyPropertyChanged(this, propertyName)
  }

  abstract onPropertyChanged(propertyName: string): void

}

export default NotifyPropertyChanged
