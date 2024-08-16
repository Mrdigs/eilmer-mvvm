import Binder from "../../bindings/classes/Binder";
import IConverter from "../../converters/classes/IConverter";
declare class ReactBinder<VM extends object> extends Binder<VM> {
    constructor(viewModel: VM);
    useBinding<P extends keyof VM & string, V = VM[P]>(propertyName: P, converter?: IConverter<VM[P], V>): [V, (value: V) => void, import("../../bindings").BindingContext];
    useCommand(commandName: string, converter: any): [(...args: any[]) => any, boolean, import("../../bindings").BindingContext];
    useExpression(expression: string): any;
    useEvent<P extends keyof VM & string>(eventName: P, listener: any): import("../../events").EventBinding<VM, P>;
}
export default ReactBinder;
//# sourceMappingURL=ReactBinder.d.ts.map