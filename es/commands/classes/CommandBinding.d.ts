import Binding from '../../bindings/classes/Binding';
import IConverter from '../../converters/classes/IConverter';
import { Listener } from '../../properties/types';
export default class CommandBinding<T = any, K = T> extends Binding<boolean> {
    private command;
    private myConverter;
    constructor(viewModel: object, commandName: string, converter?: IConverter<T, K>, subscriber?: Listener<boolean>);
    execute(...args: any[]): K;
    /**
     * Sets the value of canExecute on the command.
     */
    setValue(value: boolean): void;
    /**
     * Gets the value of canExecute on the command.
     *
     * @returns
     */
    getValue(): boolean;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
//# sourceMappingURL=CommandBinding.d.ts.map