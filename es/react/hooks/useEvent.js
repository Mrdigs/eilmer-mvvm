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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useEvent;
var react_1 = require("react");
var EventBinding_1 = __importDefault(require("../../events/classes/EventBinding"));
function useEvent(viewModel, eventName, listener) {
    if (listener === void 0) { listener = null; }
    var _a = __read((0, react_1.useState)({}), 2), state = _a[0], setState = _a[1];
    state.binding = (0, react_1.useMemo)(function () {
        return new EventBinding_1.default(viewModel, eventName);
    }, [viewModel, eventName]);
    (0, react_1.useEffect)(function () {
        // The use of useEffect here ensures that the binding becomes unbound
        // when either the component unbinds, or is re-bound to another property
        return state.binding.bind(function (parameter) {
            // Here on receiving the event, a re-render is not triggered unless
            // no listener function has been given *or* it returns true
            if (typeof listener !== "function" || listener(parameter)) {
                setState(function (state) { return (__assign({}, state)); });
            }
        });
    }, [state.binding]);
    // TODO: Unfortunately, the requirement to preserve the correct types
    // in the yeilded tuple is not yet implemented in TypeScript.
    // See: https://github.com/microsoft/TypeScript/issues/43150
    return state.binding;
}
//# sourceMappingURL=useEvent.js.map