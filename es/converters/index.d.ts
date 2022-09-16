export const dateConverter: import("./classes/DateTimeConverter").IsoDateConverter;
export const notConverter: Converter;
export const numberConverter: Converter;
export default Converters;
import Converter from "./classes/Converter";
import ConverterBase from "./classes/ConverterBase";
import ConverterException from "./classes/ConverterException";
import DateTimeConverter from "./classes/DateTimeConverter";
declare namespace Converters {
    export { dateConverter };
    export { numberConverter };
    export { notConverter };
}
export { Converter, ConverterBase, ConverterException, DateTimeConverter };
//# sourceMappingURL=index.d.ts.map