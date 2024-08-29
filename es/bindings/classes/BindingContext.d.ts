/**
 * Contains contextual information about a Binding.
 */
declare class BindingContext implements IBindingContext {
    readonly viewModel: object;
    readonly propertyName: string;
    readonly attributes: Map<any, any>;
    /**
     * @hideconstructor
     */
    constructor(viewModel: object, propertyName: string);
    setAttribute(key: any, value: any): void;
    getAttribute<T>(key: any, defaultValue?: T): T;
}
export default BindingContext;
//# sourceMappingURL=BindingContext.d.ts.map