import Command from './Command'
import { Binding } from '../../bindings'
import { executeCommand } from '../internals'

export default class CommandBinding extends Binding {

  #command = undefined
  #viewModel = undefined
  #commandName = undefined
  #converter = undefined

  constructor(viewModel, commandName, converter, subscriber) {
    const command = viewModel[commandName]
    if (!(command instanceof Command || typeof command === 'function')) {
      throw new Error(`Bound command ${commandName} should be a function or instance of Command`)
    } else {
      super(command, 'canExecute', null, subscriber)
      this.#commandName = commandName
      this.#viewModel = viewModel
      this.#converter = converter
      this.#command = command
    }
  }

  execute(...args) {
    executeCommand(this.#viewModel, this.#commandName, ...args)
  }

  canExecute() {
    const value = !!super.getValue()
    if (this.#converter) {
      return this.#converter.convertFrom(value, this.getContext())
    }
    return value
  }

  setValue(value) {
    throw new Error('The value of commands cannot be set')
  }

  getValue() {
    return this.#command
  }

  *[Symbol.iterator]() {
    yield this.execute.bind(this)
    yield this.canExecute()
  }

}
