// *********************************

/*

  TODO: I think I want a PropertyChange class, and a PropertyChangeSupport
  (like in Java) class.

*/
import Properties from './classes/Properties';
import NotifyPropertyChanged from './classes/NotifyPropertyChanged';
const getPropertyValue = Properties.getPropertyValue;
const setPropertyValue = Properties.setPropertyValue;
const addPropertyChangeListener = Properties.addPropertyChangeListener;
const removePropertyChangeListener = Properties.removePropertyChangeListener;
const notifyPropertyChanged = Properties.notifyPropertyChanged;
export { Properties, NotifyPropertyChanged, getPropertyValue, setPropertyValue, addPropertyChangeListener, removePropertyChangeListener, notifyPropertyChanged };
export default {
  NotifyPropertyChanged,
  getPropertyValue,
  setPropertyValue,
  addPropertyChangeListener,
  removePropertyChangeListener,
  notifyPropertyChanged
};