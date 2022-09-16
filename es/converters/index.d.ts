export const dateConverter: DateTimeConverter;
export const notConverter: Converter;
export const numberConverter: Converter;
export default Converters;
import DateTimeConverter from "./classes/DateTimeConverter";
import Converter from "./classes/Converter";
import ConverterBase from "./classes/ConverterBase";
import ConverterException from "./classes/ConverterException";
declare namespace Converters {
    export { dateConverter };
    export { numberConverter };
    export { notConverter };
}
export { Converter, ConverterBase, ConverterException, DateTimeConverter };
//# sourceMappingURL=index.d.ts.map