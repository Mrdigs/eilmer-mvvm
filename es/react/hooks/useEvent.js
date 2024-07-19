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
var EventBinding_1 = require("../../events/classes/EventBinding");
function useEvent(viewModel, eventName, listener) {
    if (listener === void 0) { listener = null; }
    var _a = __read((0, react_1.useState)({}), 2), state = _a[0], setState = _a[1];
    state.binding = (0, react_1.useMemo)(function () {
        return new EventBinding_1["default"](viewModel, eventName);
    }, [viewModel, eventName]);
    (0, react_1.useEffect)(function () {
        // The use of useEffect here ensures that the binding becomes unbound
        // when either the component unbinds, or is re-bound to another property
        return state.binding.bind(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Here on receiving the event, a re-render is not triggered unless
            // no listener function has been given *or* it returns true
            if (typeof listener !== 'function' || listener.apply(void 0, __spreadArray([], __read(args), false))) {
                setState(function (state) { return (__assign({}, state)); });
            }
        });
    }, [state.binding]);
    // TODO: Unfortunately, the requirement to preserve the correct types
    // in the yeilded tuple is not yet implemented in TypeScript.
    // See: https://github.com/microsoft/TypeScript/issues/43150
    return state.binding;
    /*
      const oldInstance = useRef(viewModel)
      const [ state, setState ] = useState(() => ({
        binding: new EventBinding(viewModel, eventName)
      }))
  
      useEffect(() => {
        if (viewModel !== oldInstance.current) {
          oldInstance.current = viewModel
          setState({
            binding: new EventBinding(viewModel, eventName)
          })
        }
        state.binding.bind((...args) => {
            // What is supposed to happen here? What is going to happen
            // is that the listener isn't going to get called, but the
            // component is going to re-render.


          if (typeof listener !== 'function' || listener(...args)) {
            setState(state => ({ ...state }))
          }
        })
        return state.binding.unbind.bind(state.binding)
      }, [viewModel])
  
      return state.binding
      */
}
exports["default"] = useEvent;
//# sourceMappingURL=useEvent.js.map