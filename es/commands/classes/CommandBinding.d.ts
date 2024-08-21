import Command from "./Command";
import Binding from "../../bindings/classes/Binding";
import { Listener } from "../../properties/types";
import { CommandOf, InferCommandOrFunctionType } from "../types";
export default class CommandBinding<VM extends object, P extends CommandOf<VM, T>, T = InferCommandOrFunctionType<VM[P]>> extends Binding<Command<T>, "canExecute"> {
    private command;
    constructor(viewModel: VM, commandName: P & string, subscriber?: Listener<boolean>);
    execute(parameter: T): void;
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