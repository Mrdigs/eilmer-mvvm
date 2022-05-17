export default class Event {

  #listeners = []

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

  invoke(...args) {
    this.#listeners.forEach(listener => listener(...args))
  }
}
