import IConverter from "./classes/IConverter";
import ConverterException from "./classes/ConverterException";
// import InverseBooleanConverter from './classes/InverseBooleanConverter'
import DateTimeConverter, {
  isoDateConverter,
  isoDateTimeConverter,
} from "./classes/DateTimeConverter";
import Converter from "./classes/Converter";

export const dateConverter = isoDateConverter;
export const dateTimeConverter = isoDateTimeConverter;

export const notConverter = new Converter(
  (v) => !v,
  (v) => !v
);

export const numberConverter = new Converter(
  (number) => {
    if (typeof number === "number") {
      return number.toString();
    } else {
      return number;
    }
  },
  (string) => {
    if (typeof string === "string") {
      return Number(string);
    } else {
      return string;
    }
  }
);

export { Converter, ConverterException, DateTimeConverter };

const Converters = {
  dateConverter,
  dateTimeConverter,
  numberConverter,
  notConverter,
};
Object.freeze(Converters);
export default Converters;
