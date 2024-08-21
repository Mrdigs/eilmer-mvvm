import { useEffect, useMemo, useState } from "react"
import CommandBinding from "../../commands/classes/CommandBinding"
import BindingContext from "../../bindings/classes/BindingContext"
import { CommandOf, InferCommandOrFunctionType } from "../../commands/types"

type BindingState<VM extends object, P extends CommandOf<VM, T> & string, T> = {
  binding?: CommandBinding<VM, P, T>
}

export default function useCommand<
  VM extends object,
  P extends CommandOf<VM, T> & string,
  T = InferCommandOrFunctionType<VM[P]>
>(
  viewModel: VM,
  commandName: P
): [(parameter: T) => void, boolean, BindingContext] {
  const [state, setState] = useState<BindingState<VM, P, T>>({})

  state.binding = useMemo(() => {
    return new CommandBinding<VM, P, T>(viewModel, commandName)
  }, [viewModel, commandName])

  useEffect(() => {
    // The use of useEffect here ensures that the binding becomes unbound
    // when either the component unbinds, or is re-bound to another property
    return state.binding.bind(() => setState((state) => ({ ...state })))
  }, [state.binding])

  return [
    state.binding.execute.bind(state.binding) as (parameter: T) => void,
    state.binding.getValue(),
    state.binding.getContext(),
  ]
}
