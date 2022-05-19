export default class Event {

  #listeners = []
  #defaultHandler = null

  constructor(defaultHandler = null) {
    if (defaultHandler && typeof defaultHandler !== 'function') {
      throw new Error('Event handlers must be functions')
    }
    this.#defaultHandler = defaultHandler
  }

  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Event listeners must be functions')
    }
    this.#listeners.push(listener)
    return this.unsubscribe.bind(this, listener)
  }

  unsubscribe(listener) {
    this.#listeners = this.#listeners.filter(l => l !== listener)
  }

  // TODO: This should probably be trigger()
  invoke(...args) {
    if (this.#defaultHandler) this.#defaultHandler(...args)
    this.#listeners.forEach(listener => listener(...args))
  }
}
