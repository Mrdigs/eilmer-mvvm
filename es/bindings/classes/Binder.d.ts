import Binding from "./Binding";
import CommandBinding from "../../commands/classes/CommandBinding";
import { Listener } from "../../properties/types";
import IConverter from "../../converters/classes/IConverter";
declare class Binder<VM extends object> {
    protected viewModel: VM;
    constructor(viewModel: VM);
    getViewModel(): VM;
    /**
     *
     * @return {Binding}
     */
    bindProperty<P extends keyof VM & string, V = VM[P]>(propertyName: P, converter?: IConverter<VM[P], V>, subscriber?: Listener<VM[P]>): Binding<VM, P, V>;
    /**
     *
     * @return {CommandBinding}
     */
    bindCommand<T, K = T>(commandName: keyof VM & string, converter?: IConverter<T, K>, subscriber?: Listener): CommandBinding;
}
export default Binder;
//# sourceMappingURL=Binder.d.ts.map