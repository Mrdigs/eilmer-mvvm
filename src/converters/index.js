import Converter from './classes/Converter'
import ConverterBase from './classes/ConverterBase'
import ConverterException from './classes/ConverterException'

export const dateConverter = new Converter((date, context) => {

  return date ? date.toISOString().slice(0, 10) : date

}, (string, context) => {

  const date = new Date(string)
  if (date.toString() === 'Invalid Date') {
    throw new ConverterException('Cannot parse date', context.propertyName, string)
  }
  return date

})

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
  ConverterException
}

const Converters = {
  dateConverter,
  numberConverter
}
Object.freeze(Converters)
export default Converters
