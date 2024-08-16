import Binding from "./Binding";
import CommandBinding from "../../commands/classes/CommandBinding";
import { Listener } from "../../properties/types";
import { Converter } from "../../converters";
import IConverter from "../../converters/classes/IConverter";

class Binder<VM extends object> {
  protected viewModel: VM;

  constructor(viewModel: VM) {
    this.viewModel = viewModel;
  }

  getViewModel(): VM {
    return this.viewModel;
  }

  /**
   *
   * @return {Binding}
   */
  bindProperty<P extends keyof VM & string, V = VM[P]>(
    propertyName: P,
    converter: IConverter<VM[P], V> = null,
    subscriber: Listener<VM[P]> = null
  ): Binding<VM, P, V> {
    return new Binding(this.viewModel, propertyName, converter, subscriber);
  }

  /**
   *
   * @return {CommandBinding}
   */
  bindCommand<T, K = T>(
    commandName: keyof VM & string,
    converter: IConverter<T, K> = null,
    subscriber: Listener = null
  ): CommandBinding {
    return new CommandBinding(
      this.viewModel,
      commandName,
      converter,
      subscriber
    );
  }

  // TODO: Actions (and Events?)
}

export default Binder;
