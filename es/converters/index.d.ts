import ConverterException from "./classes/ConverterException";
import DateTimeConverter from "./classes/DateTimeConverter";
import Converter from "./classes/Converter";
import IsoDateConverter from "./classes/IsoDateConverter";
export declare const isoDateConverter: IsoDateConverter;
export declare const isoDateTimeConverter: IsoDateConverter;
export declare const notConverter: Converter<unknown, boolean>;
export declare const numberConverter: Converter<unknown, unknown>;
export { Converter, ConverterException, DateTimeConverter };
declare const Converters: {
    isoDateConverter: IsoDateConverter;
    isoDateTimeConverter: IsoDateConverter;
    numberConverter: Converter<unknown, unknown>;
    notConverter: Converter<unknown, boolean>;
};
export default Converters;
//# sourceMappingURL=index.d.ts.map