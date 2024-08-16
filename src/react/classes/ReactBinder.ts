import Binder from "../../bindings/classes/Binder";
import IConverter from "../../converters/classes/IConverter";
import bindBinding from "../hooks/useBinding";
import bindExpression from "../hooks/useExpression";
import bindCommand from "../hooks/useCommand";
import bindEvent from "../hooks/useEvent";

class ReactBinder<VM extends object> extends Binder<VM> {
  constructor(viewModel: VM) {
    super(viewModel);
  }

  useBinding<P extends keyof VM & string, V = VM[P]>(
    propertyName: P,
    converter: IConverter<VM[P], V> = null
  ) {
    return bindBinding(this.viewModel, propertyName, converter);
  }

  useCommand(commandName: string, converter) {
    return bindCommand(this.viewModel, commandName, converter);
  }

  useExpression(expression: string) {
    return bindExpression(this.viewModel, expression);
  }

  useEvent<P extends keyof VM & string>(eventName: P, listener) {
    return bindEvent(this.viewModel, eventName, listener);
  }
}

export default ReactBinder;
