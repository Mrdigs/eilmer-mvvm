import { EventListener } from "../types";
export default class Event {
    private listeners;
    private defaultHandler;
    constructor(defaultHandler?: EventListener);
    subscribe(listener: EventListener): any;
    unsubscribe(listener: EventListener): void;
    trigger(...args: any[]): void;
}
//# sourceMappingURL=Event.d.ts.map