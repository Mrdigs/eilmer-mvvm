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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Command_1 = __importDefault(require("./Command"));
var Binding_1 = __importDefault(require("../../bindings/classes/Binding"));
var CommandBinding = /** @class */ (function (_super) {
    __extends(CommandBinding, _super);
    function CommandBinding(viewModel, commandName, subscriber) {
        if (subscriber === void 0) { subscriber = null; }
        var _this = this;
        var commandOrFunction = viewModel[commandName];
        if (commandOrFunction instanceof Command_1.default) {
            _this = _super.call(this, commandOrFunction, "canExecute", null, subscriber) || this;
            _this.command = commandOrFunction;
        }
        else if (typeof commandOrFunction === "function") {
            var command = Command_1.default.from(viewModel, commandOrFunction);
            command.canExecute = true;
            _this = _super.call(this, command, "canExecute", null, subscriber) || this;
            _this.command = command;
        }
        else {
            throw new Error("Bound command ".concat(commandName, " should be a function or instance of Command"));
        }
        return _this;
    }
    CommandBinding.prototype.execute = function (parameter) {
        if (this.command.canExecute) {
            this.command.execute(parameter);
        }
    };
    /**
     * Sets the value of canExecute on the command.
     */
    CommandBinding.prototype.setValue = function (value) {
        _super.prototype.setValue.call(this, value);
    };
    /**
     * Gets the value of canExecute on the command.
     *
     * @returns
     */
    CommandBinding.prototype.getValue = function () {
        return _super.prototype.getValue.call(this);
    };
    CommandBinding.prototype[Symbol.iterator] = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.execute.bind(this)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, this.getValue()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    return CommandBinding;
}(Binding_1.default));
exports.default = CommandBinding;
//# sourceMappingURL=CommandBinding.js.map