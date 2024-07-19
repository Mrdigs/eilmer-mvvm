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
var useBinding_1 = require("./useBinding");
/**
 *
 * @deprecated
 */
function useProperty(viewModel, propertyName, converter) {
    if (converter === void 0) { converter = null; }
    var _a = __read((0, useBinding_1["default"])(viewModel, propertyName, converter), 1), value = _a[0];
    return value;
}
exports["default"] = useProperty;
//# sourceMappingURL=useProperty.js.map