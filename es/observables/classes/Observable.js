"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable = /** @class */ (function () {
    function Observable(properties, object) {
        this.listeners = [];
        var target = object || this;
        var handler = new ObservableInvocationHandler(this, properties);
        var proxy = new Proxy(target, handler);
        this.self = this;
        return proxy;
    }
    // TODO: Fix any
    Observable.prototype.subscribe = function (listener) {
        this.self.listeners.push(listener);
        return this.unsubscribe.bind(this, listener);
    };
    // TODO: Fix any
    Observable.prototype.unsubscribe = function (listener) {
        this.self.listeners = this.listeners.filter(function (l) { return l !== listener; });
    };
    // TODO: Fix any
    Observable.prototype.notify = function (property, newValue, oldValue) {
        this.self.listeners.forEach(function (l) { return l(property, newValue, oldValue); });
    };
    Observable.from = function (object) {
        var properties = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            properties[_i - 1] = arguments[_i];
        }
        return new Observable(properties, object);
    };
    return Observable;
}());
exports.default = Observable;
var ObservableInvocationHandler = /** @class */ (function () {
    function ObservableInvocationHandler(object, properties) {
        this.observable = undefined;
        this.properties = undefined;
        this.observable = object;
        if (properties && properties.length) {
            this.properties = properties;
        }
    }
    // TODO: Fix any
    ObservableInvocationHandler.prototype.get = function (target, prop, receiver) {
        if (prop in this.observable) {
            return Reflect.get(this.observable, prop);
        }
        else if (prop !== "isObservable") {
            return Reflect.get.apply(null, arguments);
        }
        else {
            return function () { return true; };
        }
    };
    // TODO: Fix any
    ObservableInvocationHandler.prototype.set = function (target, property, value) {
        var old = Reflect.get(target, property);
        var result = Reflect.set.apply(null, arguments);
        if (!this.properties || this.properties.includes(property)) {
            this.observable.notify(property, value, old);
        }
        return result;
    };
    return ObservableInvocationHandler;
}());
//# sourceMappingURL=Observable.js.map