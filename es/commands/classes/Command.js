"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var properties_1 = require("../../properties");
var exceptions_1 = require("../../exceptions");
var Command = /** @class */ (function () {
    function Command() {
        this.canExecute = true;
    }
    Command.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        throw new exceptions_1.NotImplementedException();
    };
    /*
    get canExecute() {
      return true
    }
    */
    Command.prototype.canExecuteChanged = function () {
        properties_1["default"].notifyPropertyChanged(this, "canExecute");
    };
    Command.from = function (receiver, execute) {
        return new (/** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.execute = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return execute.apply(receiver, args);
            };
            return class_1;
        }(Command)))();
    };
    return Command;
}());
exports["default"] = Command;
//# sourceMappingURL=Command.js.map