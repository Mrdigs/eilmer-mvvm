import Converter from './Converter'

class ConverterBase extends Converter {

  constructor(converter) {
    if (converter instanceof Converter) {
      super(converter.convertFrom.bind(converter), converter.convertTo.bind(converter))
    } else {
      super()
    }
  }
}

export default ConverterBase
