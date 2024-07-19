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
var Binder_1 = require("../../bindings/classes/Binder");
var useBinding_1 = require("../hooks/useBinding");
var useProperty_1 = require("../hooks/useProperty");
var useExpression_1 = require("../hooks/useExpression");
var useCommand_1 = require("../hooks/useCommand");
var useEvent_1 = require("../hooks/useEvent");
var ReactBinder = /** @class */ (function (_super) {
    __extends(ReactBinder, _super);
    function ReactBinder(viewModel) {
        return _super.call(this, viewModel) || this;
    }
    /**
     *
     * @deprecated
     */
    ReactBinder.prototype.useProperty = function (propertyName, converter) {
        if (converter === void 0) { converter = null; }
        return (0, useProperty_1["default"])(this.viewModel, propertyName, converter);
    };
    ReactBinder.prototype.useBinding = function (propertyName, converter) {
        if (converter === void 0) { converter = null; }
        return (0, useBinding_1["default"])(this.viewModel, propertyName, converter);
    };
    ReactBinder.prototype.useCommand = function (commandName, converter) {
        return (0, useCommand_1["default"])(this.viewModel, commandName, converter);
    };
    ReactBinder.prototype.useExpression = function (expression) {
        return (0, useExpression_1["default"])(this.viewModel, expression);
    };
    ReactBinder.prototype.useEvent = function (eventName, listener) {
        return (0, useEvent_1["default"])(this.viewModel, eventName, listener);
    };
    return ReactBinder;
}(Binder_1["default"]));
exports["default"] = ReactBinder;
//# sourceMappingURL=ReactBinder.js.map