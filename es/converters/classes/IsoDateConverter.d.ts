import { BindingContext } from "../../bindings";
import IConverter from "./IConverter";
declare class IsoDateConverter implements IConverter<Date, string> {
    includeTime: boolean;
    constructor(includeTime: boolean);
    convertFrom(viewModelValue: Date, bindingContext: BindingContext): string;
    convertTo(viewValue: string, bindingContext: BindingContext): Date;
}
export default IsoDateConverter;
//# sourceMappingURL=IsoDateConverter.d.ts.map