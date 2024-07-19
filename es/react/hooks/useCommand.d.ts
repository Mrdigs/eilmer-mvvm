import IConverter from "../../converters/classes/IConverter";
import BindingContext from "../../bindings/classes/BindingContext";
export default function useCommand<T = any, K = T>(viewModel: object, commandName: string, converter?: IConverter<T, K>): [(...args: any[]) => K, boolean, BindingContext];
//# sourceMappingURL=useCommand.d.ts.map