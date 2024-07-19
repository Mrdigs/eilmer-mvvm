import Binding from './Binding';
import CommandBinding from '../../commands/classes/CommandBinding';
import { Listener } from '../../properties/types';
import { Converter } from '../../converters';
import IConverter from '../../converters/classes/IConverter';
declare class Binder<T extends object> {
    protected viewModel: T;
    constructor(viewModel: T);
    getViewModel(): T;
    /**
     *
     * @return {Binding}
     */
    bindProperty<T = any, K = T>(propertyName: string, converter?: IConverter<T, K>, subscriber?: Listener<T>): Binding<T, K>;
    /**
     *
     * @return {CommandBinding}
     */
    bindCommand(commandName: string, converter?: Converter, subscriber?: Listener): CommandBinding;
}
export default Binder;
//# sourceMappingURL=Binder.d.ts.map