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
        this.attributes.set(key, value);
    };
    BindingContext.prototype.getAttribute = function (key, defaultValue) {
        return this.attributes.get(key) || defaultValue;
    };
    return BindingContext;
}());
/*
;() => {
  const context = new BindingContext(null, "")
  const value = context.getAttribute("test", "value")
}
*/
exports.default = BindingContext;
//# sourceMappingURL=BindingContext.js.map