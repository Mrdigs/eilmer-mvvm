"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Binding_1 = __importDefault(require("./Binding"));
var CommandBinding_1 = __importDefault(require("../../commands/classes/CommandBinding"));
var Binder = /** @class */ (function () {
    function Binder(viewModel) {
        this.viewModel = viewModel;
    }
    Binder.prototype.getViewModel = function () {
        return this.viewModel;
    };
    /**
     *
     * @return {Binding}
     */
    Binder.prototype.bindProperty = function (propertyName, converter, subscriber) {
        if (converter === void 0) { converter = null; }
        if (subscriber === void 0) { subscriber = null; }
        return new Binding_1.default(this.viewModel, propertyName, converter, subscriber);
    };
    /**
     *
     * @return {CommandBinding}
     */
    Binder.prototype.bindCommand = function (commandName, converter, subscriber) {
        if (converter === void 0) { converter = null; }
        if (subscriber === void 0) { subscriber = null; }
        return new CommandBinding_1.default(this.viewModel, commandName, converter, subscriber);
    };
    return Binder;
}());
exports.default = Binder;
//# sourceMappingURL=Binder.js.map