import Command from "./Command"
import ICommand from "./ICommand"
import Binding from "../../bindings/classes/Binding"
import { Listener } from "../../properties/types"
import {
  CommandOf,
  CommandOrFunction,
  InferCommandOrFunctionType,
} from "../types"

export default class CommandBinding<
  VM extends object,
  P extends CommandOf<VM, T>,
  T = InferCommandOrFunctionType<VM[P]>
> extends Binding<Command<T>, "canExecute"> {
  private command: ICommand<T>

  constructor(
    viewModel: VM,
    commandName: P & string,
    subscriber: Listener<boolean> = null
  ) {
    const commandOrFunction = viewModel[commandName] as CommandOrFunction<T>
    if (commandOrFunction instanceof Command) {
      super(commandOrFunction, "canExecute", null, subscriber)
      this.command = commandOrFunction as ICommand<T>
    } else if (typeof commandOrFunction === "function") {
      const command = Command.from(viewModel, commandOrFunction) as Command<T>
      command.canExecute = true
      super(command, "canExecute", null, subscriber)
      this.command = command
    } else {
      throw new Error(
        `Bound command ${commandName} should be a function or instance of Command`
      )
    }
  }

  execute(parameter: T) {
    if (this.command.canExecute) {
      this.command.execute(parameter)
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
