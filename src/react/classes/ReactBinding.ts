import { Binding } from "../../bindings";
import IConverter from "../../converters/classes/IConverter";
import { Listener } from "../../properties/types";

import ReactBindingContext from "./ReactBindingContext";

class ReactBinding<
  VM extends object,
  P extends keyof VM & string,
  V = VM[P]
> extends Binding<VM, P, V> {
  constructor(
    viewModel: VM,
    propertyName: P,
    converter: IConverter<VM[P], V> | null = null,
    subscriber: Listener<VM[P]> = null
  ) {
    super(viewModel, propertyName, converter, subscriber);
    super.setContext(new ReactBindingContext(viewModel, propertyName));
  }
}

export default ReactBinding;
