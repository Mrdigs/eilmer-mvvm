import { BindingContext } from "../../bindings";

export default interface IConverter<VM, V = VM> {

  /**
   * Performs a conversion from the ViewModel type to the View type. Unless
   * overidden either via the constructor or by a subclass, this method will
   * perform no conversion.
   *
   * @param viewModelValue - The value to convert.
   * @param {BindingContext} bindingContext - Contextual information about the binding.
   * @throws {ConverterException} If the value cannot be converted
   */
  convertFrom(viewModelValue: VM, bindingContext: BindingContext): V;

  /**
   * Performs a conversion from the View type to the ViewModel type. Unless
   * overidden either via the constructor or by a subclass, this method will
   * perform no conversion.
   *
   * @param viewValue - The value to convert.
   * @param {BindingContext} bindingContext - Contextual information about the binding.
   * @throws {ConverterException} If the value cannot be converted
   */
  convertTo(viewValue: V, bindingContext: BindingContext): VM;

}

class TestConverter implements IConverter<number, string> {

  convertFrom(viewModelValue: number, bindingContext: BindingContext): string {
    throw new Error("Method not implemented.");
  }
  convertTo(viewValue: string, bindingContext: BindingContext): number {
    throw new Error("Method not implemented.");
  }
  
}