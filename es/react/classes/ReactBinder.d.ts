import Binder from '../../bindings/classes/Binder';
import IConverter from '../../converters/classes/IConverter';
declare class ReactBinder<T extends object> extends Binder<T> {
    constructor(viewModel: T);
    /**
     *
     * @deprecated
     */
    useProperty<T = any, K = T>(propertyName: string, converter?: IConverter<T, K>): K;
    useBinding<T = any, K = T>(propertyName: string, converter?: IConverter<T, K>): [K, (value: K) => void, import("../../bindings/classes/BindingContext").default];
    useCommand(commandName: string, converter: any): [(...args: any[]) => any, boolean, import("../../bindings/classes/BindingContext").default];
    useExpression(expression: string): any;
    useEvent(eventName: string, listener: any): import("../../events").EventBinding;
}
export default ReactBinder;
//# sourceMappingURL=ReactBinder.d.ts.map