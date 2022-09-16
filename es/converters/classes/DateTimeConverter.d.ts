export default DateTimeConverter;
declare class DateTimeConverter extends Converter {
    convertFrom(viewModelValue: any, bindingContext: any): string;
    convertTo(viewValue: any, bindingContext: any): Date;
    #private;
}
declare namespace DateTimeConverter {
    const isoDateConverter: IsoDateConverter;
    const isoDateTimeConverter: IsoDateConverter;
}
import Converter from "./Converter";
declare class IsoDateConverter extends Converter {
    constructor(includeTime: any);
    includeTime: boolean;
    convertFrom(viewModelValue: any, bindingContext: any): any;
    convertTo(viewValue: any, bindingContext: any): Date;
}
//# sourceMappingURL=DateTimeConverter.d.ts.map