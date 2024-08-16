export default class Observable {
    private listeners;
    private self;
    constructor(properties: string[], object: object);
    subscribe(listener: any): any;
    unsubscribe(listener: any): void;
    notify(property: any, newValue: any, oldValue: any): void;
    static from(object: object, ...properties: string[]): Observable;
}
//# sourceMappingURL=Observable.d.ts.map