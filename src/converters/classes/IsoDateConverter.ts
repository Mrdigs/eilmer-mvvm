import { BindingContext } from "../../bindings"
import ConverterException from "./ConverterException"
import IConverter from "./IConverter"

class IsoDateConverter implements IConverter<Date, string> {
  includeTime = false

  constructor(includeTime: boolean) {
    this.includeTime = includeTime
  }

  convertFrom(viewModelValue: Date, context: BindingContext) {
    if (viewModelValue) {
      const string = viewModelValue.toISOString()
      return this.includeTime ? string : string.slice(0, 10)
    } else {
      return null
    }
  }

  convertTo(viewValue: string, context: BindingContext) {
    const date = new Date(viewValue)
    if (date.toString() === "Invalid Date") {
      throw new ConverterException(
        "Cannot parse date",
        context.propertyName,
        viewValue
      )
    }
    return date
  }
}

export default IsoDateConverter
