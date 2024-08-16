import ConverterException from "./classes/ConverterException";
import DateTimeConverter from "./classes/DateTimeConverter";
import Converter from "./classes/Converter";
export declare const dateConverter: import("./classes/DateTimeConverter").IsoDateConverter;
export declare const dateTimeConverter: import("./classes/DateTimeConverter").IsoDateConverter;
export declare const notConverter: Converter<unknown, boolean>;
export declare const numberConverter: Converter<unknown, unknown>;
export { Converter, ConverterException, DateTimeConverter };
declare const Converters: {
    dateConverter: import("./classes/DateTimeConverter").IsoDateConverter;
    dateTimeConverter: import("./classes/DateTimeConverter").IsoDateConverter;
    numberConverter: Converter<unknown, unknown>;
    notConverter: Converter<unknown, boolean>;
};
export default Converters;
//# sourceMappingURL=index.d.ts.map