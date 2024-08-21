import { EventListener } from "../types";
export default class Event<T> {
    private listeners;
    private defaultHandler;
    constructor(defaultHandler?: EventListener<T>);
    subscribe(listener: EventListener<T>): any;
    unsubscribe(listener: EventListener<T>): void;
    trigger(arg: T): void;
}
//# sourceMappingURL=Event.d.ts.map