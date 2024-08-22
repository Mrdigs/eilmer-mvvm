import { BindingContext } from "../../bindings";
import IConverter from "./IConverter";
declare class DateTimeConverter implements IConverter<Date, string> {
    private formatter;
    private formatParts;
    private formatOptions;
    private formatDayPeriods;
    private formatMonthNames;
    private formatNumbers;
    constructor(locale: string | string[], options: Intl.DateTimeFormatOptions);
    convertFrom(viewModelValue: Date, bindingContext: BindingContext): string;
    convertTo(viewValue: string, bindingContext: BindingContext): Date;
}
export default DateTimeConverter;
//# sourceMappingURL=DateTimeConverter.d.ts.map