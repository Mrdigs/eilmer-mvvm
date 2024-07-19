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
exports.__esModule = true;
var Event_1 = require("./Event");
var Events_1 = require("./Events");
var bindings_1 = require("../../bindings");
var EventBinding = /** @class */ (function (_super) {
    __extends(EventBinding, _super);
    // TODO: If it's a function, then it MUST BEGIN with "onX"
    // getValue() can be the last value that the event was called with...
    function EventBinding(viewModel, eventName, subscriber) {
        if (subscriber === void 0) { subscriber = null; }
        var _this = this;
        var event = viewModel[eventName];
        if (!(event instanceof Event_1["default"] || typeof event === 'function')) {
            throw new Error("Bound event ".concat(eventName, " should be a function or instance of Event"));
        }
        _this = _super.call(this, viewModel, eventName, null, null) || this;
        _this.mySubscriber = null;
        _this.eventName = eventName;
        return _this;
        // this.#converter = converter
        // Probably want to store this to get the last value
        // this.#event = event
    }
    EventBinding.prototype.bind = function (subscriber) {
        if (!this.bound) {
            var args = [this.viewModel, this.eventName, subscriber];
            Events_1["default"].addEventListener.apply(null, args);
            this.mySubscriber = subscriber;
            this.bound = true;
            return this.unbind.bind(this);
        }
        else {
            throw new Error('Binding is already bound to a subscriber');
        }
    };
    EventBinding.prototype.unbind = function () {
        if (this.bound) {
            var args = [this.viewModel, this.eventName, this.mySubscriber];
            Events_1["default"].removeEventListener.apply(null, args);
            this.mySubscriber = null;
            this.bound = false;
        }
    };
    EventBinding.prototype.setValue = function (value) {
        throw new Error('The value of events cannot be set');
    };
    EventBinding.prototype.getValue = function () {
        // TODO: This needs to be the last RETURNED VALUE when the
        // event was triggered
        // return this.#command
    };
    EventBinding.prototype[Symbol.iterator] = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.unbind.bind(this)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    return EventBinding;
}(bindings_1.Binding));
exports["default"] = EventBinding;
//# sourceMappingURL=EventBinding.js.map