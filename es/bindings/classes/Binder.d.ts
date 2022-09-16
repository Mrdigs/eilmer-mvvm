export default Binder;
declare class Binder {
    constructor(viewModel: any);
    get viewModel(): any;
    /**
     *
     * @return {Binding}
     */
    bindProperty(propertyName: any, converter?: any, subscriber?: any): Binding;
    /**
     *
     * @return {CommandBinding}
     */
    bindCommand(commandName: any, converter?: any, subscriber?: any): CommandBinding;
    #private;
}
import Binding from "./Binding";
import CommandBinding from "../../commands/classes/CommandBinding";
//# sourceMappingURL=Binder.d.ts.map