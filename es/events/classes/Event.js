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
exports.__esModule = true;
var Event = /** @class */ (function () {
    function Event(defaultHandler) {
        if (defaultHandler === void 0) { defaultHandler = null; }
        this.listeners = [];
        this.defaultHandler = null;
        this.defaultHandler = defaultHandler;
    }
    Event.prototype.subscribe = function (listener) {
        this.listeners.push(listener);
        return this.unsubscribe.bind(this, listener);
    };
    Event.prototype.unsubscribe = function (listener) {
        this.listeners = this.listeners.filter(function (l) { return l !== listener; });
    };
    Event.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.defaultHandler)
            this.defaultHandler.apply(this, __spreadArray([], __read(args), false));
        this.listeners.forEach(function (listener) { return listener.apply(void 0, __spreadArray([], __read(args), false)); });
    };
    return Event;
}());
exports["default"] = Event;
//# sourceMappingURL=Event.js.map