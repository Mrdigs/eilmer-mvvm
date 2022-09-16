export default class Observable {
    static from(object: any, ...properties: any[]): Observable;
    constructor(properties: any, object: any);
    self: Observable;
    subscribe(listener: any): any;
    unsubscribe(listener: any): void;
    notify(property: any, newValue: any, oldValue: any): void;
    #private;
}
//# sourceMappingURL=Observable.d.ts.map