import Binding from "./Binding";
import { Listener } from "../../properties/types";
import IConverter from "../../converters/classes/IConverter";
declare class Binder<VM extends object> {
    protected viewModel: VM;
    constructor(viewModel: VM);
    /**
     *
     * @return {Binding}
     */
    bindProperty<P extends keyof VM & string, V = VM[P]>(propertyName: P, converter?: IConverter<VM[P], V>, subscriber?: Listener<VM[P]>): Binding<VM, P, V>;
}
export default Binder;
//# sourceMappingURL=Binder.d.ts.map