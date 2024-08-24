import { BindingContext } from "../../bindings";
import IConverter from "./IConverter";
declare class IsoDateConverter implements IConverter<Date, string> {
    includeTime: boolean;
    constructor(includeTime: boolean);
    convertFrom(viewModelValue: Date, context: BindingContext): string;
    convertTo(viewValue: string, context: BindingContext): Date;
}
export default IsoDateConverter;
//# sourceMappingURL=IsoDateConverter.d.ts.map