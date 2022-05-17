// *********************************

/*

  TODO: I think I want a PropertyChange class, and a PropertyChangeSupport
  (like in Java) class.

*/
import NotifyPropertyChanged from './classes/NotifyPropertyChanged'
import { addPropertyChangeListener, removePropertyChangeListener, notifyPropertyChanged } from './internals'

export { NotifyPropertyChanged }
export { addPropertyChangeListener, removePropertyChangeListener, notifyPropertyChanged }

export default {
  NotifyPropertyChanged,
  addPropertyChangeListener,
  removePropertyChangeListener,
  notifyPropertyChanged
}
