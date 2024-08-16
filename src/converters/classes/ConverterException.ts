export default class ConverterException extends Error {
  handled = false;
  property = undefined;
  value = undefined;

  // TODO: I can *maybe* use the BindingContext here

  constructor(message: string, property: string = null, value: any = null) {
    super(message);
    this.name = "ConverterException";
    this.property = property;
    this.value = value;
    Object.seal(this);
  }

  toString() {
    return `${this.name}: ${this.message} (property: ${this.property}, value: ${this.value})`;
  }
}
