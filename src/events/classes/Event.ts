import { EventListener } from "../types"

export default class Event<T> {
  private listeners: EventListener<T>[] = []
  private defaultHandler = null

  constructor(defaultHandler: EventListener<T> = null) {
    this.defaultHandler = defaultHandler
  }

  subscribe(listener: EventListener<T>) {
    this.listeners.push(listener)
    return this.unsubscribe.bind(this, listener)
  }

  unsubscribe(listener: EventListener<T>) {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }

  trigger(arg: T) {
    if (this.defaultHandler) this.defaultHandler(arg)
    this.listeners.forEach((listener) => listener(arg))
  }
}
