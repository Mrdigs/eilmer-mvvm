export default class ConverterException extends Error {
  handled = false;
  property = undefined;
  value = undefined; // TODO: I can *maybe* use the BindingContext here

  constructor(message, property, value, options) {
    super(message, options);
    this.name = 'ConverterException';
    this.property = property;
    this.value = value;
    Object.seal(this);
  }

  toString() {
    return `${this.name}: ${this.message} (property: ${this.property}, value: ${this.value})`;
  }

}