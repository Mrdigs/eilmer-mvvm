import Command from './Command'
import Binding from '../../bindings/classes/Binding'
import { executeCommand } from '../internals'
import IConverter from '../../converters/classes/IConverter';
import { Listener } from '../../properties/types';
import BindingContext from '../../bindings/classes/BindingContext';

export default class CommandBinding<T = any, K = T> extends Binding<boolean> {

  private command: Command<T>;
  private myConverter: IConverter<T, K>;


  constructor(viewModel: object, commandName: string, converter: IConverter<T, K> = null, subscriber: Listener<boolean> = null) {
    const command = viewModel[commandName]
    if (!(command instanceof Command || typeof command === 'function')) {
      throw new Error(`Bound command ${commandName} should be a function or instance of Command`)
    } else {
      super(command, 'canExecute', null, subscriber)
      this.myConverter = converter
      if (command instanceof Command) {
        this.command = command
      } else {
        type returnType = ReturnType<typeof command>
        this.command = Command.from<returnType>(viewModel, command)
      }
    }
  }

  execute(...args: any[]): K {
    // TODO: Wait: what about canExecute? That needs sorting out....
    if (this.myConverter) {
      // Ah right, so this is where the issue is....
      // command.execute.apply(command, args)
      const returnValue = this.command.execute(...args)
      return this.myConverter.convertFrom(returnValue, this.getContext())
    } else {
      return this.command.execute(...args) as any
    }
  }

  /**
   * Sets the value of canExecute on the command.
   */
  setValue(value: boolean) {
    super.setValue(value)
  }

  /**
   * Gets the value of canExecute on the command.
   * 
   * @returns 
   */
  getValue(): boolean {
    return super.getValue()
  }

  *[Symbol.iterator]() {
    yield this.execute.bind(this)
    yield this.getValue()
  }

}

class CommandExecutor<T> {

  private command: Command<T>

  constructor(command: Command<T> = null) {
    // ((...args: any[]) => K)
  }
}

class TestConverter implements IConverter<string, number> {
  convertFrom(viewModelValue: string, bindingContext: BindingContext): number {
    throw new Error('Method not implemented.')
  }
  convertTo(viewValue: number, bindingContext: BindingContext): string {
    throw new Error('Method not implemented.')
  }

}

const vm = { aCommand: async () => 1 }
const converter = new TestConverter()
// const binding = new CommandBinding(vm, "aCommand", converter)
const binding = new CommandBinding<number>(vm, "aCommand")
binding.execute()

// I want to be able to decide whether I should await the result
// if it's an async function. It's basically a question of whether 
// it returns a Promise or not. 

// Maybe I'm barking up the wrong tree

type aCommandReturnType = ReturnType<typeof vm.aCommand>
const executor = new CommandExecutor<aCommandReturnType>()

const command = new Command<boolean>()
type commandReturnType = ReturnType<typeof command.execute>

