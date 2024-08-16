import { Binding } from "../../bindings";
export default class EventBinding<VM extends object, P extends keyof VM & string> extends Binding<VM, P, VM[P]> {
    private mySubscriber;
    private eventName;
    constructor(viewModel: VM, eventName: P);
    bind(subscriber: any): any;
    unbind(): void;
    setValue(value: VM[P]): void;
    getValue(): VM[P];
    [Symbol.iterator](): Generator<any, void, unknown>;
}
//# sourceMappingURL=EventBinding.d.ts.map