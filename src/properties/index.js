// *********************************

/*

  TODO: I think I want a PropertyChange class, and a PropertyChangeSupport
  (like in Java) class.

*/
import NotifyPropertyChanged from './classes/NotifyPropertyChanged'
import { addPropertyChangeListener, removePropertyChangeListener, notifyPropertyChanged } from './internals'
import { getPropertyValue, setPropertyValue } from './internals'

export { NotifyPropertyChanged }
export { addPropertyChangeListener, removePropertyChangeListener, notifyPropertyChanged }
export { getPropertyValue, setPropertyValue }

export default {
  NotifyPropertyChanged,
  getPropertyValue,
  setPropertyValue,
  addPropertyChangeListener,
  removePropertyChangeListener,
  notifyPropertyChanged
}
