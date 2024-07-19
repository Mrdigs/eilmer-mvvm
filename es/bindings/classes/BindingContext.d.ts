import Binding from "./Binding";
/**
 * Contains contextual information about a Binding.
 */
declare class BindingContext {
    readonly viewModel: object;
    readonly propertyName: string;
    readonly binding: Binding;
    readonly attributes: {};
    /**
     * @hideconstructor
     */
    constructor(viewModel: object, propertyName: string, binding: Binding);
    setAttribute(key: string, value: any): void;
    getAttribute(key: string): any;
}
export default BindingContext;
//# sourceMappingURL=BindingContext.d.ts.map