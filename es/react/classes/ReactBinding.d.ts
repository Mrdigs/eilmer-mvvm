import { Binding } from '../../bindings';
import IConverter from '../../converters/classes/IConverter';
import { Listener } from '../../properties/types';
declare class ReactBinding<T = any, K = T> extends Binding<T, K> {
    constructor(viewModel: any, propertyName: string, converter?: IConverter<T, K>, subscriber?: Listener<T>);
}
export default ReactBinding;
//# sourceMappingURL=ReactBinding.d.ts.map