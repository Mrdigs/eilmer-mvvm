import Binding from '../../bindings/classes/Binding';
import IConverter from '../../converters/classes/IConverter';
import { Listener } from '../../properties/types';
export default class ExpressionBinding<T = any, K = T> extends Binding<T, K> {
    private properties;
    private expression;
    private evaluated;
    private listener;
    private myViewModel;
    private variableResolver;
    constructor(viewModel: object, expr: string, converter?: IConverter<T, K>);
    private resolveVariable;
    evaluate(): void;
    setValue(value: K): void;
    getValue(): K;
    bind(subscriber: Listener<T>): any;
    unbind(): void;
    [Symbol.iterator](): Generator<K, void, unknown>;
}
//# sourceMappingURL=ExpressionBinding.d.ts.map