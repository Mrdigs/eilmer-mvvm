export default Converter;
/**
 * A Converter performs the task of converting values between the View and
 * the ViewModel.
 */
declare class Converter {
    constructor(fromConverter: any, toConverter: any);
    /**
     * Performs a conversion from the ViewModel type to the View type. Unless
     * overidden either via the constructor or by a subclass, this method will
     * perform no conversion.
     *
     * @param viewModelValue - The value to convert.
     * @param {BindingContext} bindingContext - Contextual information about the binding.
     * @throws {ConverterException} If the value cannot be converted
     */
    convertFrom(viewModelValue: any, bindingContext: BindingContext): any;
    /**
     * Performs a conversion from the View type to the ViewModel type. Unless
     * overidden either via the constructor or by a subclass, this method will
     * perform no conversion.
     *
     * @param viewValue - The value to convert.
     * @param {BindingContext} bindingContext - Contextual information about the binding.
     * @throws {ConverterException} If the value cannot be converted
     */
    convertTo(viewValue: any, bindingContext: BindingContext): any;
    #private;
}
//# sourceMappingURL=Converter.d.ts.map