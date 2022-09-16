export default class ExpressionBinding extends Binding {
    constructor(viewModel: any, expr: any, converter?: any, subscriber?: any);
    evaluate(): void;
    setValue(value: any): void;
    getValue(): void;
    bind(subscriber: any): any;
    #private;
}
import Binding from "../../bindings/classes/Binding";
//# sourceMappingURL=ExpressionBinding.d.ts.map