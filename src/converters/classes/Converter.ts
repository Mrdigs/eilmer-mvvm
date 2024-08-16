import IConverter from "./IConverter";
import { BindingContext } from "../../bindings";

class Converter<VM, V> implements IConverter<VM, V> {
  from: (vm: VM) => V;
  to: (v: V) => VM;

  constructor(from: (vm: VM) => V, to: (v: V) => VM) {
    this.from = from;
    this.to = to;
  }

  convertFrom(viewModelValue: VM, bindingContext: BindingContext) {
    return this.from(viewModelValue);
  }

  convertTo(viewValue: V, bindingContext: BindingContext) {
    return this.to(viewValue);
  }
}

export default Converter;
