/**
 * A Converter performs the task of converting values between the View and
 * the ViewModel.
 */
class Converter {
  #fromConverter = v => v;
  #toConverter = v => v;

  constructor(fromConverter, toConverter) {
    this.#fromConverter = fromConverter || this.#fromConverter;
    this.#toConverter = toConverter || this.#toConverter;
  }
  /**
   * Performs a conversion from the ViewModel type to the View type. Unless
   * overidden either via the constructor or by a subclass, this method will
   * perform no conversion.
   *
   * @param viewModelValue - The value to convert.
   * @param {BindingContext} bindingContext - Contextual information about the binding.
   * @throws {ConverterException} If the value cannot be converted
   */


  convertFrom(viewModelValue, bindingContext) {
    return this.#fromConverter(viewModelValue, bindingContext);
  }
  /**
   * Performs a conversion from the View type to the ViewModel type. Unless
   * overidden either via the constructor or by a subclass, this method will
   * perform no conversion.
   *
   * @param viewValue - The value to convert.
   * @param {BindingContext} bindingContext - Contextual information about the binding.
   * @throws {ConverterException} If the value cannot be converted
   */


  convertTo(viewValue, bindingContext) {
    return this.#toConverter(viewValue, bindingContext);
  }

}

export default Converter;