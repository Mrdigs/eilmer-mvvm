export default class Observable {
  #listeners = [];

  constructor(properties, object) {
    const target = object || this;
    const handler = new ObservableInvocationHandler(this, properties);
    const proxy = new Proxy(target, handler); // proxy[Symbol.toStringTag] = () =>

    this.self = this;
    return proxy;
  }

  subscribe(listener) {
    this.self.#listeners.push(listener);
    return this.unsubscribe.bind(this, listener);
  }

  unsubscribe(listener) {
    this.self.#listeners = this.listeners.filter(l => l !== listener);
  }

  notify(property, newValue, oldValue) {
    this.self.#listeners.forEach(l => l(property, newValue, oldValue));
  }

  static from(object, ...properties) {
    return new Observable(properties, object);
  }

}

class ObservableInvocationHandler {
  #observable = undefined;
  #properties = undefined;

  constructor(object, properties) {
    this.#observable = object;

    if (properties && properties.length) {
      this.#properties = properties;
    }
  }

  get(target, prop, receiver) {
    if (prop in this.#observable) {
      return Reflect.get(this.#observable, prop);
    } else if (prop !== 'isObservable') {
      return Reflect.get(...arguments);
    } else {
      return () => true;
    }
  }

  set(target, property, value) {
    const old = Reflect.get(target, property);
    const result = Reflect.set(...arguments);

    if (!this.#properties || this.#properties.includes(property)) {
      this.#observable.notify(property, value, old);
    }

    return result;
  }

}