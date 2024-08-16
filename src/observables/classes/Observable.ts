export default class Observable {
  private listeners = [];
  private self: Observable;

  constructor(properties: string[], object: object) {
    const target = object || this;
    const handler = new ObservableInvocationHandler(this, properties);
    const proxy = new Proxy(target, handler);
    this.self = this;
    return proxy;
  }

  // TODO: Fix any
  subscribe(listener: any) {
    this.self.listeners.push(listener);
    return this.unsubscribe.bind(this, listener);
  }

  // TODO: Fix any
  unsubscribe(listener: any) {
    this.self.listeners = this.listeners.filter((l) => l !== listener);
  }

  // TODO: Fix any
  notify(property: any, newValue: any, oldValue: any) {
    this.self.listeners.forEach((l) => l(property, newValue, oldValue));
  }

  static from(object: object, ...properties: string[]) {
    return new Observable(properties, object);
  }
}

class ObservableInvocationHandler {
  private observable = undefined;
  private properties = undefined;

  constructor(object: object, properties: string[]) {
    this.observable = object;
    if (properties && properties.length) {
      this.properties = properties;
    }
  }

  // TODO: Fix any
  get(target: any, prop: any, receiver: any) {
    if (prop in this.observable) {
      return Reflect.get(this.observable, prop);
    } else if (prop !== "isObservable") {
      return Reflect.get.apply(null, arguments);
    } else {
      return () => true;
    }
  }

  // TODO: Fix any
  set(target: any, property: any, value: any) {
    const old = Reflect.get(target, property);
    const result = Reflect.set.apply(null, arguments);
    if (!this.properties || this.properties.includes(property)) {
      this.observable.notify(property, value, old);
    }
    return result;
  }
}
