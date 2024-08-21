export default interface INotifyPropertyChanged {
  onPropertyChanged: (propertyName: string) => void
}
