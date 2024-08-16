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
var ConverterException = /** @class */ (function (_super) {
    __extends(ConverterException, _super);
    // TODO: I can *maybe* use the BindingContext here
    function ConverterException(message, property, value) {
        if (property === void 0) { property = null; }
        if (value === void 0) { value = null; }
        var _this = _super.call(this, message) || this;
        _this.handled = false;
        _this.property = undefined;
        _this.value = undefined;
        _this.name = "ConverterException";
        _this.property = property;
        _this.value = value;
        Object.seal(_this);
        return _this;
    }
    ConverterException.prototype.toString = function () {
        return "".concat(this.name, ": ").concat(this.message, " (property: ").concat(this.property, ", value: ").concat(this.value, ")");
    };
    return ConverterException;
}(Error));
exports.default = ConverterException;
//# sourceMappingURL=ConverterException.js.map