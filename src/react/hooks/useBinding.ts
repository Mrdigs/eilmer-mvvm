import { useEffect, useMemo, useState } from "react"
import ReactBinding from "../classes/ReactBinding"
import IConverter from "../../converters/classes/IConverter"
import { Binding } from "../../bindings"
import BindingContext from "../../bindings/classes/BindingContext"

type BindingState<T, K> = {
  binding?: Binding<T, K>
}

/**
 * Creates and manages a ReactBinding between a specified property on the
 * supplied ViewModel and the calling component, forcing a re-render of the
 * component whenever the bound ViewModel property is modified.
 *
 * A specific converter for type-transformation may be provided. If no
 * converter is used, the types of the ViewModel property and the output
 * will be the same. The converter is responsible for conversion between
 * your ViewModel property data type to the View data type and vice versa.
 *
 * @template VM Contains the data-type of the ViewModel property being targeted.
 * @template V Represents the View data type after any conversions. If no
 * converter is used, VM and V will invariably be the same.
 *
 * @param {object} viewModel Object on whose property the binding is
 * going to be made.
 * @param {string} propertyName The exact name of the property present in
 * the viewModel that you intend to bind.
 * @param {IConverter<VM,V>} [converter=null] Optional. A valid IConverter
 * object that will manage the conversion between the ViewModel property
 * (VM) and the View (V) data types.
 *
 * @return {[V, (value: V) => {}]} Returns a tuple where the first element
 * is the current value of the property in your ViewModel specified by
 * propertyName (of type V). The second element is a function accepting
 * a V type input which, when called, will update that same ViewModel property.
 */
export default function useBinding<VM = any, V = VM>(
  viewModel: VM,
  propertyName: keyof VM & string,
  converter: IConverter<VM, V> = null
): [V, (value: V) => void, BindingContext] {
  const [state, setState] = useState<BindingState<VM, V>>({})

  state.binding = useMemo(() => {
    return new ReactBinding<VM, V>(viewModel, propertyName, converter)
  }, [viewModel, propertyName, converter])

  useEffect(() => {
    // The use of useEffect here ensures that the binding becomes unbound
    // when either the component unbinds, or is re-bound to another property,
    // or another viewModel, or with another converter.
    return state.binding.bind(() => setState((state) => ({ ...state })))
  }, [state.binding])

  return [
    state.binding.getValue() as V,
    state.binding.setValue.bind(state.binding) as (value: V) => void,
    state.binding.getContext(),
  ]
}
