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
var react_1 = require("react");
function useInstanceOf(instanceClass) {
    var constructorArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        constructorArgs[_i - 1] = arguments[_i];
    }
    return (0, react_1.useMemo)(function () {
        var InstanceFactory = instanceClass.bind.apply(instanceClass, __spreadArray([instanceClass], __read(constructorArgs), false));
        return new InstanceFactory();
    }, __spreadArray([instanceClass], __read(constructorArgs), false));
}
exports["default"] = useInstanceOf;
//# sourceMappingURL=useInstanceOf.js.map