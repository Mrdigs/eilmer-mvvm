import Converter from './classes/Converter'
import ConverterBase from './classes/ConverterBase'
import ConverterException from './classes/ConverterException'
// import InverseBooleanConverter from './classes/InverseBooleanConverter'
import DateTimeConverter from './classes/DateTimeConverter'

export const dateConverter = DateTimeConverter.isoDateConverter

export const notConverter = new Converter((v) => !v, (v) => !v)

export const numberConverter = new Converter((number, context) => {
  if (typeof number === 'number') {
    return number.toString()
  } else {
    return number
  }
}, (string, context) => {
  if (typeof string === 'string') {
    return Number(string)
  } else {
    return string
  }
})

export {
  Converter,
  ConverterBase,
  ConverterException,
  DateTimeConverter
}

const Converters = {
  dateConverter,
  numberConverter,
  notConverter
}
Object.freeze(Converters)
export default Converters
