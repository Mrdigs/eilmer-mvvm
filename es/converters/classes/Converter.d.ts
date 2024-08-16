import IConverter from "./IConverter";
import { BindingContext } from "../../bindings";
declare class Converter<VM, V> implements IConverter<VM, V> {
    from: (vm: VM) => V;
    to: (v: V) => VM;
    constructor(from: (vm: VM) => V, to: (v: V) => VM);
    convertFrom(viewModelValue: VM, bindingContext: BindingContext): V;
    convertTo(viewValue: V, bindingContext: BindingContext): VM;
}
export default Converter;
//# sourceMappingURL=Converter.d.ts.map