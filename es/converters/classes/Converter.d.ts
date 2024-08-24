import IConverter from "./IConverter";
import { BindingContext } from "../../bindings";
declare class Converter<VM, V> implements IConverter<VM, V> {
    from: (vm: VM, b: BindingContext) => V;
    to: (v: V, b: BindingContext) => VM;
    constructor(from: (vm: VM, b: BindingContext) => V, to: (v: V, b: BindingContext) => VM);
    convertFrom(viewModelValue: VM, context: BindingContext): V;
    convertTo(viewValue: V, context: BindingContext): VM;
}
export default Converter;
//# sourceMappingURL=Converter.d.ts.map