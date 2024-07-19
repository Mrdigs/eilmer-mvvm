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
var ReactBinding_1 = require("../classes/ReactBinding");
/**
 * Creates and manages a ReactBinding between a specified property on the
 * supplied ViewModel and the calling component, forcing a re-render of the
 * component whenever the bound ViewModel property is modified.
 *
 * A specific converter for type-transformation may be provided. If no
 * converter is used, the types of the ViewModel property and the output
 * will be the same. The converter is responsible for conversion between
 * your ViewModel property data type to the View data type and vice versa.
 *
 * @template VM Contains the data-type of the ViewModel property being targeted.
 * @template V Represents the View data type after any conversions. If no
 * converter is used, VM and V will invariably be the same.
 *
 * @param {object} viewModel Object on whose property the binding is
 * going to be made.
 * @param {string} propertyName The exact name of the property present in
 * the viewModel that you intend to bind.
 * @param {IConverter<VM,V>} [converter=null] Optional. A valid IConverter
 * object that will manage the conversion between the ViewModel property
 * (VM) and the View (V) data types.
 *
 * @return {[V, (value: V) => {}]} Returns a tuple where the first element
 * is the current value of the property in your ViewModel specified by
 * propertyName (of type V). The second element is a function accepting
 * a V type input which, when called, will update that same ViewModel property.
 */
function useBinding(viewModel, propertyName, converter) {
    if (converter === void 0) { converter = null; }
    var _a = __read((0, react_1.useState)({}), 2), state = _a[0], setState = _a[1];
    state.binding = (0, react_1.useMemo)(function () {
        return new ReactBinding_1["default"](viewModel, propertyName, converter);
    }, [viewModel, propertyName, converter]);
    (0, react_1.useEffect)(function () {
        // The use of useEffect here ensures that the binding becomes unbound
        // when either the component unbinds, or is re-bound to another property,
        // or another viewModel, or with another converter.
        return state.binding.bind(function () { return setState(function (state) { return (__assign({}, state)); }); });
    }, [state.binding]);
    return [
        state.binding.getValue(),
        state.binding.setValue.bind(state.binding),
        state.binding.getContext(),
    ];
}
exports["default"] = useBinding;
//# sourceMappingURL=useBinding.js.map