export default class CommandBinding extends Binding {
    constructor(viewModel: any, commandName: any, converter?: any, subscriber?: any);
    execute(...args: any[]): void;
    get canExecute(): any;
    setValue(value: any): void;
    #private;
}
import Binding from "../../bindings/classes/Binding";
//# sourceMappingURL=CommandBinding.d.ts.map