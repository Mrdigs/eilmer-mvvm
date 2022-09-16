declare namespace _default {
    export { NotifyPropertyChanged };
    export { getPropertyValue };
    export { setPropertyValue };
    export { addPropertyChangeListener };
    export { removePropertyChangeListener };
    export { notifyPropertyChanged };
}
export default _default;
import Properties from "./classes/Properties";
import NotifyPropertyChanged from "./classes/NotifyPropertyChanged";
export const getPropertyValue: typeof Properties.getPropertyValue;
export const setPropertyValue: typeof Properties.setPropertyValue;
export const addPropertyChangeListener: typeof Properties.addPropertyChangeListener;
export const removePropertyChangeListener: typeof Properties.removePropertyChangeListener;
export const notifyPropertyChanged: typeof Properties.notifyPropertyChanged;
export { Properties, NotifyPropertyChanged };
//# sourceMappingURL=index.d.ts.map