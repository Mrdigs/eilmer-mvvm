import IConverter from "../../converters/classes/IConverter";
/**
 *
 * @deprecated
 */
export default function useProperty<T = any, K = T>(viewModel: T, propertyName: keyof T & string, converter?: IConverter<T, K>): K;
//# sourceMappingURL=useProperty.d.ts.map