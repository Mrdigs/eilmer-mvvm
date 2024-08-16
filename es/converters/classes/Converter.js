"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Converter = /** @class */ (function () {
    function Converter(from, to) {
        this.from = from;
        this.to = to;
    }
    Converter.prototype.convertFrom = function (viewModelValue, bindingContext) {
        return this.from(viewModelValue);
    };
    Converter.prototype.convertTo = function (viewValue, bindingContext) {
        return this.to(viewValue);
    };
    return Converter;
}());
exports.default = Converter;
//# sourceMappingURL=Converter.js.map