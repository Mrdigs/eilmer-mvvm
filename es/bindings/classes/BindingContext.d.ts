export default BindingContext;
/**
 * Contains contextual information about a Binding.
 */
declare class BindingContext {
    /**
     * @hideconstructor
     */
    constructor(viewModel: any, propertyName: any);
    viewModel: any;
    propertyName: any;
    /**
     *
     */
    attributes: any;
    setAttribute(key: any, value: any): void;
    getAttribute(key: any): any;
}
//# sourceMappingURL=BindingContext.d.ts.map