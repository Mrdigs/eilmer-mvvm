import { Listener } from '../types';
export default class Properties {
    static addPropertyChangeListener(target: object, propertyName: string, listener: Listener): () => void;
    static removePropertyChangeListener(target: object, propertyName: string, listener: Listener): void;
    static notifyPropertyChanged(target: object, propertyName: string): void;
    static getPropertyValue(target: object, propertyName: string): any;
    static setPropertyValue(target: any, propertyName: any, value: any): void;
}
//# sourceMappingURL=Properties.d.ts.map