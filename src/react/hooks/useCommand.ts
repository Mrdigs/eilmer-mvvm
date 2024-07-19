import { useEffect, useMemo, useRef, useState } from "react";
import CommandBinding from "../../commands/classes/CommandBinding";
import Binding from "../../bindings/classes/Binding";
import IConverter from "../../converters/classes/IConverter";
import BindingContext from "../../bindings/classes/BindingContext";

type BindingState<T, K> = {
  binding?: CommandBinding<T, K>;
};

export default function useCommand<T = any, K = T>(
  viewModel: object,
  commandName: string,
  converter: IConverter<T, K> = null
): [(...args: any[]) => K, boolean, BindingContext] {
  const [state, setState] = useState<BindingState<T, K>>({});

  state.binding = useMemo(() => {
    return new CommandBinding(viewModel, commandName, converter);
  }, [viewModel, commandName, converter]);

  useEffect(() => {
    // The use of useEffect here ensures that the binding becomes unbound
    // when either the component unbinds, or is re-bound to another property
    return state.binding.bind(() => setState((state) => ({ ...state })));
  }, [state.binding]);

  return [
    state.binding.execute.bind(state.binding),
    state.binding.getValue(),
    state.binding.getContext(),
  ];
}
