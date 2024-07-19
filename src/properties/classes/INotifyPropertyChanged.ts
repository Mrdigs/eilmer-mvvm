import { Event } from "../../events";

export default interface INotifyPropertyChanged {

    onPropertyChanged: (propertyName: string) => void | Event
}