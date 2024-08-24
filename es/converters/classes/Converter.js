"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Converter = /** @class */ (function () {
    function Converter(from, to) {
        this.from = from;
        this.to = to;
    }
    Converter.prototype.convertFrom = function (viewModelValue, context) {
        return this.from(viewModelValue, context);
    };
    Converter.prototype.convertTo = function (viewValue, context) {
        return this.to(viewValue, context);
    };
    return Converter;
}());
exports.default = Converter;
//# sourceMappingURL=Converter.js.map