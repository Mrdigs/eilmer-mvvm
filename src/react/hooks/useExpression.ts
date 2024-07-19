import { useEffect, useMemo, useRef, useState } from "react"
import ExpressionBinding from "../../expressions/classes/ExpressionBinding"

type BindingState<T> = {
  binding?: ExpressionBinding;
};

// TODO: Converter?
// TODO: Allow a generic type on Expression binding
export default function useExpression<VM = any>(viewModel: object, expression: string): VM {
  const [state, setState] = useState<BindingState<VM>>({});

  state.binding = useMemo(() => {
    return new ExpressionBinding(viewModel, expression);
  }, [viewModel, expression]);

  useEffect(() => {
    // The use of useEffect here ensures that the binding becomes unbound
    // when either the component unbinds, or is re-bound to another property
    return state.binding.bind(() => setState((state) => ({ ...state })));
  }, [state.binding]);

  return state.binding.getValue()

}
  