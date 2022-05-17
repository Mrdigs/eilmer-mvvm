import Command from './classes/Command'
import CommandBinding from './classes/CommandBinding'
import { executeCommand } from './internals'

const Commands = {
  Command,
  CommandBinding,
  executeCommand
}

export { Command, CommandBinding, executeCommand }
export default Commands
