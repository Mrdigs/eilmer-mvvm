import Event from "./Event"
import Events from "./Events"
import { Binding } from "../../bindings"

export default class EventBinding<
  VM extends object,
  P extends keyof VM & string
> extends Binding<VM, P, VM[P]> {
  private mySubscriber = null
  private eventName: string

  // TODO: If it's a function, then it MUST BEGIN with "onX"
  // getValue() can be the last value that the event was called with...
  constructor(viewModel: VM, eventName: P) {
    const event = viewModel[eventName]
    if (!(event instanceof Event || typeof event === "function")) {
      throw new Error(
        `Bound event ${eventName} should be a function or instance of Event`
      )
    }
    super(viewModel, eventName, null, null)
    this.eventName = eventName
    // this.#converter = converter
    // Probably want to store this to get the last value
    // this.#event = event
  }

  bind(subscriber) {
    if (!this.bound) {
      const args = [this.viewModel, this.eventName, subscriber]
      Events.addEventListener.apply(null, args)
      this.mySubscriber = subscriber
      this.bound = true
      return this.unbind.bind(this)
    } else {
      throw new Error("Binding is already bound to a subscriber")
    }
  }

  unbind() {
    if (this.bound) {
      const args = [this.viewModel, this.eventName, this.mySubscriber]
      Events.removeEventListener.apply(null, args)
      this.mySubscriber = null
      this.bound = false
    }
  }

  setValue(value: VM[P]) {
    throw new Error("The value of events cannot be set")
  }

  getValue(): VM[P] {
    throw new Error("The value of events cannot be read")
    // TODO: This needs to be the last RETURNED VALUE when the
    // event was triggered
  }

  *[Symbol.iterator]() {
    yield this.unbind.bind(this)
  }
}

// TODO:
/*
  What I want to do with the generics is tie the subscriber (an EventListener)
  to the returntype of the function, if it is a function, or the args of the Event,
  if it is an Event.

  Such that:

  const vm = {
    onSomething: new Event<string>()
  }

  const binding = new EventBinding(vm, "onSomething")
  binding.bind((anArg) => {})

  anArg is a string!
*/

{
  const vm = {
    onSomething: new Event(),
  }

  const binding = new EventBinding(vm, "onSomething")
  binding.bind((anArg) => {})
}
