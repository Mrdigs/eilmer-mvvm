"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Action = /** @class */ (function () {
    function Action() {
        this.handlers = [];
    }
    Action.prototype.addHandler = function (handler) {
        if (typeof handler !== "function") {
            throw new Error("Action Handlers must be functions");
        }
        this.handlers.push(handler);
        return this.removeHandler.bind(this, handler);
    };
    Action.prototype.removeHandler = function (listener) {
        this.handlers = this.handlers.filter(function (l) { return l !== listener; });
    };
    Action.prototype.invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var handlers = this.handlers;
        return new Promise(function (resolve, reject) {
            var handled = false;
            for (var i = handlers.length; i > 0; i--) {
                handled = handled || handlers[i - 1].apply(handlers, __spreadArray([resolve], __read(args), false));
                if (handled)
                    break;
            }
            if (!handled) {
                reject(new Error("Action not handled"));
            }
        });
    };
    return Action;
}());
exports.default = Action;
//# sourceMappingURL=Action.js.map