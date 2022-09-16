export class NotImplementedException extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'NotImplementedException';
  }

}