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
Object.defineProperty(exports, "__esModule", { value: true });
var bindings_1 = require("../../bindings");
var ReactBindingContext = /** @class */ (function (_super) {
    __extends(ReactBindingContext, _super);
    function ReactBindingContext(viewModel, propertyName) {
        var _this = _super.call(this, viewModel, propertyName) || this;
        _this.component = undefined;
        _this.componentProperty = undefined;
        // I really need a nicer way of doing this, BUT
        // THIS WILL DO FOR THE TIME BEING
        _this.setComponentPropertiesHandler = function () { return false; };
        return _this;
    }
    // TODO: I don't even know if I need this anymore
    ReactBindingContext.prototype.setComponentProperties = function (properties) {
        // return this.setComponentPropertiesHandler(properties);
    };
    return ReactBindingContext;
}(bindings_1.BindingContext));
exports.default = ReactBindingContext;
//# sourceMappingURL=ReactBindingContext.js.map