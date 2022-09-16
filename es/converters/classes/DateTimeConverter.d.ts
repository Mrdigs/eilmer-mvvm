export class IsoDateConverter extends Converter {
    constructor(includeTime: any);
    includeTime: boolean;
    convertFrom(viewModelValue: any, bindingContext: any): any;
    convertTo(viewValue: any, bindingContext: any): Date;
}
export default DateTimeConverter;
import Converter from "./Converter";
declare class DateTimeConverter extends Converter {
    convertFrom(viewModelValue: any, bindingContext: any): string;
    convertTo(viewValue: any, bindingContext: any): Date;
    #private;
}
declare namespace DateTimeConverter {
    const isoDateConverter: IsoDateConverter;
    const isoDateTimeConverter: IsoDateConverter;
}
//# sourceMappingURL=DateTimeConverter.d.ts.map