import Command from "./classes/Command";

interface FunctionCommand extends Function {
  canExecute?: boolean;
}

export function executeCommand<T>(target: T, commandName: keyof T, ...args) {
  const command: any = target[commandName];
  if (command instanceof Command) {
    if (command.canExecute) {
      return command.execute.apply(command, args);
    } else {
      console.warn("This behaviour needs fleshing out");
      throw Error("Command cannot be executed");
    }
  } else if (typeof command === "function") {
    // TODO: Check whether "instanceof FunctionCommand" is correct
    if (command.canExecute !== false) {
      // if (commandName.substr(-7) === 'Command') {
      return command.apply(target, args);
    } else {
      // This probably needs another property like isCommand
      // so that users can mark a method is *not* being a command
      // and it should probably error or at least warn at bind time
      // TODO: This behaviour needs fleshing out
      console.warn(
        "This behaviour needs fleshing out",
        "canExecute:",
        command.canExecute
      );
      console.log("Erm...2");
      throw Error("Command cannot be executed");
    }
  }
}
