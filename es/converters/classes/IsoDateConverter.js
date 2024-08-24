"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConverterException_1 = __importDefault(require("./ConverterException"));
var IsoDateConverter = /** @class */ (function () {
    function IsoDateConverter(includeTime) {
        this.includeTime = false;
        this.includeTime = includeTime;
    }
    IsoDateConverter.prototype.convertFrom = function (viewModelValue, context) {
        if (viewModelValue) {
            var string = viewModelValue.toISOString();
            return this.includeTime ? string : string.slice(0, 10);
        }
        else {
            return null;
        }
    };
    IsoDateConverter.prototype.convertTo = function (viewValue, context) {
        var date = new Date(viewValue);
        if (date.toString() === "Invalid Date") {
            throw new ConverterException_1.default("Cannot parse date", context.propertyName, viewValue);
        }
        return date;
    };
    return IsoDateConverter;
}());
exports.default = IsoDateConverter;
//# sourceMappingURL=IsoDateConverter.js.map