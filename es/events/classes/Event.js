"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    Event.prototype.trigger = function (arg) {
        if (this.defaultHandler)
            this.defaultHandler(arg);
        this.listeners.forEach(function (listener) { return listener(arg); });
    };
    return Event;
}());
exports.default = Event;
//# sourceMappingURL=Event.js.map