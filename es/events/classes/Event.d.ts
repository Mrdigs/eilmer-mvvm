export default class Event {
    constructor(defaultHandler?: any);
    subscribe(listener: any): any;
    unsubscribe(listener: any): void;
    invoke(...args: any[]): void;
    #private;
}
//# sourceMappingURL=Event.d.ts.map