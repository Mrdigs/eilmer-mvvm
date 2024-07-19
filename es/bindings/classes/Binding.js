"use strict";
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var properties_1 = require("../../properties");
var converters_1 = require("../../converters");
var BindingContext_1 = require("./BindingContext");
/**
 * Provides a binding between an object property and a listener.
 *
 * The subscriber is notified if the property value is updated from anywhere
 * in the code, not only via the Binder.
 *
 * This class will work on any type of object providing the bound property
 * is configurable. This means that certain cases are not possible, particularly
 * with built-in object types: new Binding(new Array(), 'length') (SEE BELOW, NOT RIGHT) will trigger
 * an error, for example (the {@link Observable} class can be utilized for
 * this kind of use case).
 *
 * TODO: Note that new Binding(Object.create(new Array()), 'length') *will*
 * work!
 *
 * @example
 * const object = { count: 0 }
 * const binding = new Binding(object, 'count')
 * binding.bind((count) => {
 *   console.log('Count is now:', count)
 * })
 * setInterval(() => {
 *   binding.setValue(binding.getValue() + 1)
 * }, 1000)
 */
var Binding = /** @class */ (function () {
    /**
     * Create a new Binding. If a subscriber function is provided, then the
     * Binding is immediately to that listener on construction.
     *
     * @param {object} viewModel - The object to bind to.
     * @param {string} propertyName - The name of the property on the object.
     * @param {Converter} converter - An optional Converter.
     * @param {function} subscriber - An optional listener function.
     */
    function Binding(viewModel, propertyName, converter, subscriber) {
        if (converter === void 0) { converter = null; }
        if (subscriber === void 0) { subscriber = null; }
        this.bound = false;
        if (!(viewModel && propertyName)) {
            throw new Error('viewModel and propertyName are required arguments');
        }
        else if (typeof propertyName !== 'string') {
            throw new TypeError('propertyName must be a string');
        }
        else {
            this.context = new BindingContext_1["default"](viewModel, propertyName, this);
            if (converter instanceof converters_1.Converter) {
                this.converter = converter;
            }
            this.viewModel = viewModel;
            this.propertyName = propertyName;
            if (subscriber) {
                this.bind(subscriber);
            }
        }
    }
    /**
     * Returns the context for this Binding. This context is provided to the
     * Converter, if there is one. There's no good reason to retrieve it
     * genrally and so this method should not be called but is required
     * for interal purposes.
     *
     * @ignore
     */
    Binding.prototype.getContext = function () {
        return this.context;
    };
    Binding.prototype.setContext = function (context) {
        this.context = context;
    };
    /**
     * Binds this binding to a listener function which will be called
     * whenever the object property this Binder is bound to is updated
     * by some process.
     *
     * A Binding can only have one subscriber, so this method should only
     * be called once, unless the {@link Binding#unbind} method is called
     * beforehand.
     *
     * @param {function} subscriber - The listener function.
     */
    Binding.prototype.bind = function (subscriber) {
        if (!this.bound) {
            var args = [this.viewModel, this.propertyName, subscriber];
            properties_1.Properties.addPropertyChangeListener.apply(null, args);
            this.subscriber = subscriber;
            this.bound = true;
            return this.unbind.bind(this);
        }
        else {
            throw new Error('Binding is already bound to a subscriber');
        }
    };
    /**
     * Unbinds the bound subscriber and disposes of the Binders reference
     * to it. After this method is called, a new subscriber can be bound to
     * the Binding using the {@link Binding#bind} method.
     */
    Binding.prototype.unbind = function () {
        if (this.bound) {
            var args = [this.viewModel, this.propertyName, this.subscriber];
            properties_1.Properties.removePropertyChangeListener.apply(null, args);
            this.subscriber = null;
            this.bound = false;
        }
    };
    /**
     * Sets the value of the property on the bound object. If a converter
     * has been specified, the value is converted using the converter's
     * {@link Converter#convertTo} method.
     *
     * @param value - The value to set the property to.
     */
    Binding.prototype.setValue = function (value) {
        // TODO: this should allow a function to be passed as per Reacts
        // useState hook.
        if (this.converter) {
            try {
                var converted = this.converter.convertTo(value, this.getContext());
                properties_1.Properties.setPropertyValue(this.viewModel, this.propertyName, converted);
            }
            catch (exception) {
                if (exception instanceof converters_1.ConverterException) {
                    console.warn('Unhandled', exception.toString());
                }
                else {
                    throw exception;
                }
            }
        }
        else {
            properties_1.Properties.setPropertyValue(this.viewModel, this.propertyName, value);
        }
    };
    /**
     * Retrieves the current value of the bound property. If a converter
     * has been specified, the value is converted using the converter's
     * {@link Converter#convertFrom} method.
     *
     * @returns The current property value.
     */
    Binding.prototype.getValue = function () {
        var value = properties_1.Properties.getPropertyValue(this.viewModel, this.propertyName);
        if (this.converter) {
            return this.converter.convertFrom(value, this.getContext());
        }
        return value;
    };
    // TODO: Unfortunately, the requirement to preserve the correct types
    // in the yeilded tuple is not yet implemented in TypeScript.
    // See: https://github.com/microsoft/TypeScript/issues/43150
    Binding.prototype[Symbol.iterator] = function () {
        var values;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    values = [this.getValue(), this.setValue.bind(this)];
                    // return values[Symbol.iterator]
                    return [5 /*yield**/, __values(values)
                        /*
                        yield this.getValue()
                        yield this.setValue.bind(this)
                        */
                    ];
                case 1:
                    // return values[Symbol.iterator]
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    return Binding;
}());
// Ok so this works great without a converter, but what about *with* a converter
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
var test = [1, "2"];
var _a = __read(test, 2), first = _a[0], second = _a[1];
// So both are string | number and that's no good.
var object = { count: 0 };
var converter = new TestConverter();
var binding = new Binding(object, 'count');
var _b = __read(binding, 2), value = _b[0], setValue = _b[1];
//setValue(5)
/*
binding.bind((count: number) => {
   console.log('Count is now:', count)
})
binding.getValue() * 2
/*
setInterval(() => {
  binding.setValue(binding.getValue() + 1)
}, 1000)
*/
exports["default"] = Binding;
//# sourceMappingURL=Binding.js.map