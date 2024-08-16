"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBinding = exports.Command = void 0;
var Command_1 = __importDefault(require("./classes/Command"));
exports.Command = Command_1.default;
var CommandBinding_1 = __importDefault(require("./classes/CommandBinding"));
exports.CommandBinding = CommandBinding_1.default;
exports.default = { Command: Command_1.default, CommandBinding: CommandBinding_1.default };
//# sourceMappingURL=index.js.map