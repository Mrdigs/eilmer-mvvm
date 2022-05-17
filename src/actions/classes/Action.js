export default class Action {

  #handlers = []

  addHandler(handler) {
    if (typeof handler !== 'function') {
      throw new Error('Action Handlers must be functions')
    }
    this.#handlers.push(handler)
    return this.removeHandler.bind(this, handler)
  }

  removeHandler(listener) {
    this.#handlers = this.#handlers.filter(l => l !== listener)
  }

  invoke(...args) {
    const handlers = this.#handlers
    return new Promise((resolve, reject) => {
      let handled = false
      for (var i = handlers.length; i > 0; i--) {
        handled = handled || handlers[i - 1](resolve, ...args)
        if (handled) break
      }
      if (!handled) {
        reject(new Error('Action not handled'))
      }
    })
  }

}
