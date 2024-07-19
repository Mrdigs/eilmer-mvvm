import IConverter from "../../converters/classes/IConverter";
import BindingContext from "../../bindings/classes/BindingContext";
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
export default function useBinding<VM = any, V = VM>(viewModel: object, propertyName: string, converter?: IConverter<VM, V>): [V, (value: V) => void, BindingContext];
//# sourceMappingURL=useBinding.d.ts.map