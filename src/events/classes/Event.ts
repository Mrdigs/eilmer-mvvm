import { EventListener } from "../types"

export default class Event {

  private listeners: EventListener[] = []
  private defaultHandler = null

  constructor(defaultHandler: EventListener = null) {
    this.defaultHandler = defaultHandler
  }

  subscribe(listener: EventListener) {
    this.listeners.push(listener)
    return this.unsubscribe.bind(this, listener)
  }

  unsubscribe(listener: EventListener) {
    this.listeners = this.listeners.filter(l => l !== listener)
  }

  trigger(...args: any[]) {
    if (this.defaultHandler) this.defaultHandler(...args)
    this.listeners.forEach(listener => listener(...args))
  }
}
