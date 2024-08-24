"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Contains contextual information about a Binding.
 */
var BindingContext = /** @class */ (function () {
    /**
     * @hideconstructor
     */
    function BindingContext(viewModel, propertyName) {
        this.attributes = new Map();
        this.viewModel = viewModel;
        this.propertyName = propertyName;
    }
    BindingContext.prototype.setAttribute = function (key, value) {
        this.attributes[key] = value;
    };
    BindingContext.prototype.getAttribute = function (key) {
        return this.attributes[key];
    };
    return BindingContext;
}());
exports.default = BindingContext;
//# sourceMappingURL=BindingContext.js.map