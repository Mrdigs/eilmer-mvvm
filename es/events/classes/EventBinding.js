import Event from './Event';
import Events from './Events';
import { Binding } from '../../bindings';
export default class EventBinding extends Binding {
  #bound = false;
  #subscriber = null;
  #eventName;
  #viewModel; // TODO: If it's a function, then it MUST BEGIN with "onX"
  // getValue() can be the last value that the event was called with...

  constructor(viewModel, eventName, subscriber = null) {
    const event = viewModel[eventName];

    if (!(event instanceof Event || typeof event === 'function')) {
      throw new Error(`Bound event ${eventName} should be a function or instance of Event`);
    } else {
      super(viewModel, eventName, null, null);
      this.#eventName = eventName;
      this.#viewModel = viewModel; // this.#converter = converter
      // Probably want to store this to get the last value
      // this.#event = event
    }
  }

  bind(subscriber) {
    if (!this.#bound) {
      const args = [this.#viewModel, this.#eventName, subscriber];
      Events.addEventListener.apply(null, args);
      this.#subscriber = subscriber;
      this.#bound = true;
      return this.unbind.bind(this);
    } else {
      throw new Error('Binding is already bound to a subscriber');
    }
  }

  unbind() {
    if (this.#bound) {
      const args = [this.#viewModel, this.#eventName, this.#subscriber];
      Events.removeEventListener.apply(null, args);
      this.#subscriber = null;
      this.#bound = false;
    }
  }

  setValue(value) {
    throw new Error('The value of events cannot be set');
  }

  getValue() {// TODO: This needs to be the last RETURNED VALUE when the
    // event was triggered
    // return this.#command
  }

  *[Symbol.iterator]() {
    yield this.unbind.bind(this);
  }

}