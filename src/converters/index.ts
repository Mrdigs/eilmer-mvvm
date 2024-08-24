import IConverter from "./classes/IConverter"
import ConverterException from "./classes/ConverterException"
import DateTimeConverter from "./classes/DateTimeConverter"
import Converter from "./classes/Converter"
import IsoDateConverter from "./classes/IsoDateConverter"

export const isoDateConverter = new IsoDateConverter(false)
export const isoDateTimeConverter = new IsoDateConverter(true)

export const notConverter = new Converter<boolean, boolean>(
  (v) => !v,
  (v) => !v
)

export const numberConverter = new Converter<number, string>(
  (number) => {
    if (typeof number === "number") {
      return number.toString()
    } else {
      return number
    }
  },
  (string) => {
    if (typeof string === "string") {
      return Number(string)
    } else {
      return string
    }
  }
)

export { IConverter, Converter, ConverterException, DateTimeConverter }

const Converters = {
  isoDateConverter,
  isoDateTimeConverter,
  numberConverter,
  notConverter,
}
Object.freeze(Converters)
export default Converters
