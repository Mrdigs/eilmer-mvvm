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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var Command_1 = require("./Command");
var Binding_1 = require("../../bindings/classes/Binding");
var CommandBinding = /** @class */ (function (_super) {
    __extends(CommandBinding, _super);
    function CommandBinding(viewModel, commandName, converter, subscriber) {
        if (converter === void 0) { converter = null; }
        if (subscriber === void 0) { subscriber = null; }
        var _this = this;
        var command = viewModel[commandName];
        if (!(command instanceof Command_1["default"] || typeof command === 'function')) {
            throw new Error("Bound command ".concat(commandName, " should be a function or instance of Command"));
        }
        else {
            _this = _super.call(this, command, 'canExecute', null, subscriber) || this;
            _this.myConverter = converter;
            if (command instanceof Command_1["default"]) {
                _this.command = command;
            }
            else {
                _this.command = Command_1["default"].from(viewModel, command);
            }
        }
        return _this;
    }
    CommandBinding.prototype.execute = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // TODO: Wait: what about canExecute? That needs sorting out....
        if (this.myConverter) {
            // Ah right, so this is where the issue is....
            // command.execute.apply(command, args)
            var returnValue = (_a = this.command).execute.apply(_a, __spreadArray([], __read(args), false));
            return this.myConverter.convertFrom(returnValue, this.getContext());
        }
        else {
            return (_b = this.command).execute.apply(_b, __spreadArray([], __read(args), false));
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
}(Binding_1["default"]));
exports["default"] = CommandBinding;
var CommandExecutor = /** @class */ (function () {
    function CommandExecutor(command) {
        if (command === void 0) { command = null; }
        // ((...args: any[]) => K)
    }
    return CommandExecutor;
}());
var TestConverter = /** @class */ (function () {
    function TestConverter() {
    }
    TestConverter.prototype.convertFrom = function (viewModelValue, bindingContext) {
        throw new Error('Method not implemented.');
    };
    TestConverter.prototype.convertTo = function (viewValue, bindingContext) {
        throw new Error('Method not implemented.');
    };
    return TestConverter;
}());
var vm = { aCommand: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, 1];
    }); }); } };
var converter = new TestConverter();
// const binding = new CommandBinding(vm, "aCommand", converter)
var binding = new CommandBinding(vm, "aCommand");
binding.execute();
var executor = new CommandExecutor();
var command = new Command_1["default"]();
//# sourceMappingURL=CommandBinding.js.map