import Binder from "../../bindings/classes/Binder";
import IConverter from "../../converters/classes/IConverter";
import { CommandOf, InferCommandOrFunctionType } from "../../commands/types";
declare class ReactBinder<VM extends object> extends Binder<VM> {
    constructor(viewModel: VM);
    useBinding<P extends keyof VM & string, V = VM[P]>(propertyName: P, converter?: IConverter<VM[P], V>): [V, (value: V) => void, import("../..").BindingContext];
    useCommand<P extends CommandOf<VM, T> & string, T = InferCommandOrFunctionType<VM[P]>>(commandName: P): [(parameter: T) => void, boolean, import("../..").BindingContext];
    useExpression(expression: string): any;
    useEvent<P extends keyof VM & string>(eventName: P, listener: any): import("../../events").EventBinding<VM, P>;
}
export default ReactBinder;
//# sourceMappingURL=ReactBinder.d.ts.map