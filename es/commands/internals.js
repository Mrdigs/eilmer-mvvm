"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommand = executeCommand;
var Command_1 = __importDefault(require("./classes/Command"));
function executeCommand(target, commandName) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var command = target[commandName];
    if (command instanceof Command_1.default) {
        if (command.canExecute) {
            return command.execute.apply(command, args);
        }
        else {
            console.warn("This behaviour needs fleshing out");
            throw Error("Command cannot be executed");
        }
    }
    else if (typeof command === "function") {
        // TODO: Check whether "instanceof FunctionCommand" is correct
        if (command.canExecute !== false) {
            // if (commandName.substr(-7) === 'Command') {
            return command.apply(target, args);
        }
        else {
            // This probably needs another property like isCommand
            // so that users can mark a method is *not* being a command
            // and it should probably error or at least warn at bind time
            // TODO: This behaviour needs fleshing out
            console.warn("This behaviour needs fleshing out", "canExecute:", command.canExecute);
            console.log("Erm...2");
            throw Error("Command cannot be executed");
        }
    }
}
//# sourceMappingURL=internals.js.map