"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.__esModule = true;
var react_1 = require("react");
var ExpressionBinding_1 = require("../../expressions/classes/ExpressionBinding");
// TODO: Needs reworking
// TODO: Converter?
function useExpression(instance, expression) {
    //if (!(instance instanceof ViewModel)) {
    var oldInstance = (0, react_1.useRef)(instance);
    var _a = __read((0, react_1.useState)(function () { return ({
        binding: new ExpressionBinding_1["default"](instance, expression)
    }); }), 2), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
        if (instance !== oldInstance.current) {
            oldInstance.current = instance;
            setState({
                binding: new ExpressionBinding_1["default"](instance, expression)
            });
        }
        return state.binding.bind(function () { return setState(function (state) { return (__assign({}, state)); }); });
    }, [instance]);
    // TODO: iterator generator on the binding
    return state.binding;
    //} else {
    //  throw new Error('Not implemented yet')
    //}
}
exports["default"] = useExpression;
//# sourceMappingURL=UseExpression.js.map