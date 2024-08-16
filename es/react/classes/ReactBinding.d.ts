import { Binding } from "../../bindings";
import IConverter from "../../converters/classes/IConverter";
import { Listener } from "../../properties/types";
declare class ReactBinding<VM extends object, P extends keyof VM & string, V = VM[P]> extends Binding<VM, P, V> {
    constructor(viewModel: VM, propertyName: P, converter?: IConverter<VM[P], V> | null, subscriber?: Listener<VM[P]>);
}
export default ReactBinding;
//# sourceMappingURL=ReactBinding.d.ts.map