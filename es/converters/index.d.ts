import IConverter from "./classes/IConverter";
import ConverterException from "./classes/ConverterException";
import DateTimeConverter from "./classes/DateTimeConverter";
import Converter from "./classes/Converter";
import IsoDateConverter from "./classes/IsoDateConverter";
export declare const isoDateConverter: IsoDateConverter;
export declare const isoDateTimeConverter: IsoDateConverter;
export declare const notConverter: Converter<boolean, boolean>;
export declare const numberConverter: Converter<number, string>;
export { IConverter, Converter, ConverterException, DateTimeConverter };
declare const Converters: {
    isoDateConverter: IsoDateConverter;
    isoDateTimeConverter: IsoDateConverter;
    numberConverter: Converter<number, string>;
    notConverter: Converter<boolean, boolean>;
};
export default Converters;
//# sourceMappingURL=index.d.ts.map