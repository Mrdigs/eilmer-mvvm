"use strict";
exports.__esModule = true;
var PropertyAccessor = /** @class */ (function () {
    function PropertyAccessor(object, propertyDescriptor) {
        this.value = new WeakMap();
        this.value.set(object || this, propertyDescriptor.value);
        this.getter = propertyDescriptor.get;
        this.setter = propertyDescriptor.set;
    }
    PropertyAccessor.prototype.set = function (object, value) {
        if (this.setter) {
            return this.setter.call(object, value);
        }
        else {
            this.value.set(object || this, value);
            return value;
        }
    };
    PropertyAccessor.prototype.get = function (object) {
        if (this.getter) {
            return this.getter.call(object);
        }
        else {
            return this.value.get(object || this);
        }
    };
    return PropertyAccessor;
}());
exports["default"] = PropertyAccessor;
//# sourceMappingURL=PropertyAccessor.js.map