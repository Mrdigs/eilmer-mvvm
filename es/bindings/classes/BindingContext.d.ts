/**
 * Contains contextual information about a Binding.
 */
declare class BindingContext {
    readonly viewModel: object;
    readonly propertyName: string;
    readonly attributes: {};
    /**
     * @hideconstructor
     */
    constructor(viewModel: object, propertyName: string);
    setAttribute(key: string, value: any): void;
    getAttribute(key: string): any;
}
export default BindingContext;
//# sourceMappingURL=BindingContext.d.ts.map