"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var bindings_1 = require("../../bindings");
var ReactBindingContext_1 = require("./ReactBindingContext");
var ReactBinding = /** @class */ (function (_super) {
    __extends(ReactBinding, _super);
    function ReactBinding(viewModel, propertyName, converter, subscriber) {
        if (converter === void 0) { converter = null; }
        if (subscriber === void 0) { subscriber = null; }
        var _this = _super.call(this, viewModel, propertyName, converter, subscriber) || this;
        _super.prototype.setContext.call(_this, new ReactBindingContext_1["default"](viewModel, propertyName, _this));
        return _this;
    }
    return ReactBinding;
}(bindings_1.Binding));
exports["default"] = ReactBinding;
//# sourceMappingURL=ReactBinding.js.map