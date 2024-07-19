import INotifyPropertyChanged from './INotifyPropertyChanged';
/**
 *
 *
 * @abstract
 */
declare abstract class NotifyPropertyChanged implements INotifyPropertyChanged {
    /**
     * Notifies any listeners for a given property that it has changed.
     */
    notifyPropertyChanged(propertyName: string): void;
    abstract onPropertyChanged(propertyName: string): void;
}
export default NotifyPropertyChanged;
//# sourceMappingURL=NotifyPropertyChanged.d.ts.map