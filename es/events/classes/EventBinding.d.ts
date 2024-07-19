import { Binding } from '../../bindings';
export default class EventBinding extends Binding {
    private mySubscriber;
    private eventName;
    constructor(viewModel: object, eventName: string, subscriber?: any);
    bind(subscriber: any): any;
    unbind(): void;
    setValue(value: any): void;
    getValue(): void;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
//# sourceMappingURL=EventBinding.d.ts.map