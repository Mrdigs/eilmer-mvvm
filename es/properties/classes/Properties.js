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
exports.__esModule = true;
var PropertyAccessor_1 = require("./PropertyAccessor");
var Event_1 = require("../../events/classes/Event");
var Properties = /** @class */ (function () {
    function Properties() {
    }
    Properties.addPropertyChangeListener = function (target, propertyName, listener) {
        var _a, _b, _c, _d;
        var _e = __read(getTargetAndPropertyName(target, propertyName), 2), object = _e[0], property = _e[1];
        var defaultDescriptor = { enumerable: false, configurable: true };
        var descriptor = getPropertyDescriptor(object, property) || defaultDescriptor;
        if (!((_a = descriptor.set) === null || _a === void 0 ? void 0 : _a.listeners)) {
            var accessor_1 = new PropertyAccessor_1["default"](object, descriptor);
            descriptor.get = (function () {
                return accessor_1.get(this);
            });
            descriptor.set = (function (v, notify) {
                var old = accessor_1.get(this), result = accessor_1.set(this, v);
                if (descriptor === defaultDescriptor && !descriptor.enumerable) {
                    descriptor.enumerable = true;
                    descriptor.configurable = false;
                    Object.defineProperty(object, property, descriptor);
                }
                if (v !== old || notify) {
                    // TODO: I'm not sure if there's any purpose to this internal version 
                    // It does handle the propertyChangeSupport stuff, so maybe. I depends 
                    // whether I want to actually handle that, plus the whole revision thing.
                    notifyPropertyChangedInternal(object, property, notify);
                    // notifyPropertyChanged(object, property, v, old)
                }
                return result;
            });
            delete descriptor.value;
            delete descriptor.writable;
            if (descriptor !== defaultDescriptor) {
                descriptor.configurable = false;
            }
            else {
                console.warn("[Eilmer] Binding to an non-existent property ".concat(property, ". This isn't a problem, but may not be intentional"));
            }
            descriptor.set.rev = 0;
            // TODO: Is there some way of not keeping a strong 
            // reference to each listener?
            descriptor.set.listeners = [];
            Object.defineProperty(object, property, descriptor);
        }
        if ((_b = descriptor.set) === null || _b === void 0 ? void 0 : _b.listeners) {
            descriptor.set.listeners.push(listener);
        }
        if ((_d = (_c = object[property]) === null || _c === void 0 ? void 0 : _c.isObservable) === null || _d === void 0 ? void 0 : _d.call()) {
            // Support for Observable properties. To avoid memory leaks,
            // the subscriber is the properties setter, so the property
            // gets set to itself and triggers the listener to be called
            // TODO: Oh it's my own Observable class. What was that for again?
            // Needs visiting.
            object[property].subscribe(descriptor.set.bind(object, object[property], true));
        }
        return function () {
            Properties.removePropertyChangeListener(object, property, listener);
        };
    };
    Properties.removePropertyChangeListener = function (target, propertyName, listener) {
        //if (typeof listener === 'function') {
        var _a = __read(getTargetAndPropertyName(target, propertyName), 2), object = _a[0], property = _a[1];
        var descriptor = Object.getOwnPropertyDescriptor(object, property);
        var set = descriptor.set;
        if (set === null || set === void 0 ? void 0 : set.listeners) {
            var listeners = set.listeners;
            set.listeners = listeners.filter(function (l) { return l !== listener; });
        }
        // TODO: I need to track down why this is here. What is it used for,
        // if anything? Right now, this is a terrible hack to cast it 
        // as any. Need to check whether this is actually referenced anywhere
        // (listener as any).value = undefined
        // listener.value = undefined
        //}
    };
    Properties.notifyPropertyChanged = function (target, propertyName) {
        var _a = __read(getTargetAndPropertyName(target, propertyName), 2), object = _a[0], property = _a[1];
        notifyPropertyChangedInternal(object, property, true);
    };
    // TODO: Is this useful? WHere is it used?
    Properties.getPropertyValue = function (target, propertyName) {
        var _a = __read(getTargetAndPropertyName(target, propertyName), 2), object = _a[0], property = _a[1];
        return object[property];
    };
    // TODO: Is this useful? WHere is it used?
    Properties.setPropertyValue = function (target, propertyName, value) {
        var _a = __read(getTargetAndPropertyName(target, propertyName), 2), object = _a[0], property = _a[1];
        object[property] = value;
    };
    return Properties;
}());
exports["default"] = Properties;
function notifyPropertyChangedInternal(targetObject, propertyName, regardless) {
    var _a = __read(getTargetAndPropertyName(targetObject, propertyName), 2), object = _a[0], property = _a[1];
    // If the descriptor doesn't exist then we shouldn't error
    var descriptor = Object.getOwnPropertyDescriptor(object, property);
    var set = descriptor.set;
    if (set === null || set === void 0 ? void 0 : set.listeners) {
        var value_1 = object[property], rev_1 = ++set.rev;
        set.listeners.forEach(function (listener) {
            // TODO: DOES THIS *ACTUALLY* SOLVE ANYTHING????
            // TODO: Why did I even add this in anyway? I think it's so that
            // I don't have to keep track of the last value that the listener
            // has received for memory leak purposes. I'll keep it in anyway 
            // for now and revisit it later
            var revision = listener;
            if (regardless || revision.rev !== rev_1) {
                revision.rev = rev_1;
                listener(value_1);
            }
        });
        // Automatically triggers the onPropertyChanged event for this property
        // if the target object supports receiving that event.
        if (canNotifyPropertyChanged(object)) {
            if (object.onPropertyChanged instanceof Event_1["default"]) {
                object.onPropertyChanged.trigger(property);
            }
            else {
                object.onPropertyChanged(property);
            }
        }
    }
}
function getPropertyDescriptor(targetObject, propertyName) {
    if (targetObject) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(targetObject, propertyName);
        if (propertyDescriptor) {
            return propertyDescriptor;
        }
        else {
            return getPropertyDescriptor(Object.getPrototypeOf(targetObject), propertyName);
        }
    }
}
function getTargetAndPropertyName(targetObject, propertyName) {
    var target = targetObject, targetPropertyName = propertyName;
    // TODO: Should I allow this? Is there any need, especially when I'm looking 
    // at including expression support. Actually it's neccessary *FOR* expression support!!!!
    if (typeof propertyName === 'string' && propertyName.includes('.')) {
        var parts = propertyName.split('.'), length_1 = parts.length - 1;
        for (var i = 0; i < length_1; i++) {
            if (parts[i].length)
                target = target[parts[i]];
            if (typeof target === 'undefined') {
                throw new Error('Cannot bind to a property of an undefined object');
            }
        }
        targetPropertyName = parts[length_1];
    }
    else if (typeof target === 'undefined') {
        throw new Error('Cannot bind to a property of an undefined object');
    }
    return [target, targetPropertyName];
}
function canNotifyPropertyChanged(arg) {
    return arg.onPropertyChanged !== undefined;
}
//# sourceMappingURL=Properties.js.map