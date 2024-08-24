/**
 * Contains contextual information about a Binding.
 */
declare class BindingContext {
    readonly viewModel: object;
    readonly propertyName: string;
    readonly attributes: Map<any, any>;
    /**
     * @hideconstructor
     */
    constructor(viewModel: object, propertyName: string);
    setAttribute(key: any, value: any): void;
    getAttribute(key: any): any;
}
export default BindingContext;
//# sourceMappingURL=BindingContext.d.ts.map