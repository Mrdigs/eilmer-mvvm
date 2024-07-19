"use strict";
exports.__esModule = true;
/**
 * Contains contextual information about a Binding.
 */
var BindingContext = /** @class */ (function () {
    /**
     * @hideconstructor
     */
    function BindingContext(viewModel, propertyName, binding) {
        this.attributes = {};
        this.viewModel = viewModel;
        this.propertyName = propertyName;
        this.binding = binding;
    }
    BindingContext.prototype.setAttribute = function (key, value) {
        this.attributes[key] = value;
    };
    BindingContext.prototype.getAttribute = function (key) {
        return this.attributes[key];
    };
    return BindingContext;
}());
exports["default"] = BindingContext;
//# sourceMappingURL=BindingContext.js.map