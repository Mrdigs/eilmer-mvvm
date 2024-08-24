import IConverter from "./IConverter"
import { BindingContext } from "../../bindings"

class Converter<VM, V> implements IConverter<VM, V> {
  from: (vm: VM, b: BindingContext) => V
  to: (v: V, b: BindingContext) => VM

  constructor(
    from: (vm: VM, b: BindingContext) => V,
    to: (v: V, b: BindingContext) => VM
  ) {
    this.from = from
    this.to = to
  }

  convertFrom(viewModelValue: VM, context: BindingContext) {
    return this.from(viewModelValue, context)
  }

  convertTo(viewValue: V, context: BindingContext) {
    return this.to(viewValue, context)
  }
}

export default Converter
