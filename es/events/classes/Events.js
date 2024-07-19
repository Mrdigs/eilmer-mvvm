"use strict";
exports.__esModule = true;
var Event_1 = require("./Event");
var Events = /** @class */ (function () {
    function Events() {
    }
    Events.addEventListener = function (object, eventName, listener) {
        var _a;
        if (typeof listener !== 'function') {
            throw new TypeError('Event listeners must be functions');
        }
        if (!(object[eventName] instanceof Event_1["default"])) {
            if (typeof object[eventName] === 'function') {
                var descriptor = getPropertyDescriptor(object, eventName);
                if (!((_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.value) === null || _a === void 0 ? void 0 : _a.event)) {
                    var event_1 = new Event_1["default"](object[eventName].bind(object));
                    descriptor.value = event_1.trigger.bind(event_1);
                    descriptor.value.event = event_1;
                    Object.defineProperty(object, eventName, descriptor);
                    event_1.subscribe(listener);
                }
                else {
                    var event_2 = descriptor.value.event;
                    event_2.subscribe(listener);
                }
            }
        }
        else {
            return object[eventName].subscribe(listener);
        }
    };
    Events.removeEventListener = function (object, eventName, listener) {
        var _a;
        if (typeof listener === 'function') {
            if (!(object[eventName] instanceof Event_1["default"])) {
                var descriptor = Object.getOwnPropertyDescriptor(object, eventName);
                if ((_a = descriptor.value) === null || _a === void 0 ? void 0 : _a.event) {
                    var event_3 = descriptor.value.event;
                    event_3.unsubscribe(listener);
                }
            }
            else {
                object[eventName].unsubscribe(listener);
            }
        }
    };
    return Events;
}());
exports["default"] = Events;
function getPropertyDescriptor(object, property) {
    if (object) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(object, property);
        if (propertyDescriptor) {
            return propertyDescriptor;
        }
        else {
            return getPropertyDescriptor(Object.getPrototypeOf(object), property);
        }
    }
}
//# sourceMappingURL=Events.js.map