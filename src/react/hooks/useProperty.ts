import IConverter from "../../converters/classes/IConverter"
import useBinding from "./useBinding"

/**
 *
 * @deprecated
 */
export default function useProperty<T = any, K = T>(
  viewModel: T,
  propertyName: keyof T & string,
  converter: IConverter<T, K> = null
): K {
  const [value] = useBinding(viewModel, propertyName, converter)
  return value
}
