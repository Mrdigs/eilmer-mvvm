import BindingContext from "../../bindings/classes/BindingContext";
import { CommandOf, InferCommandOrFunctionType } from "../../commands/types";
export default function useCommand<VM extends object, P extends CommandOf<VM, T> & string, T = InferCommandOrFunctionType<VM[P]>>(viewModel: VM, commandName: P): [(parameter: T) => void, boolean, BindingContext];
//# sourceMappingURL=useCommand.d.ts.map