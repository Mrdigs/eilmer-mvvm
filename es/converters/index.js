"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeConverter = exports.ConverterException = exports.Converter = exports.numberConverter = exports.notConverter = exports.isoDateTimeConverter = exports.isoDateConverter = void 0;
var ConverterException_1 = __importDefault(require("./classes/ConverterException"));
exports.ConverterException = ConverterException_1.default;
var DateTimeConverter_1 = __importDefault(require("./classes/DateTimeConverter"));
exports.DateTimeConverter = DateTimeConverter_1.default;
var Converter_1 = __importDefault(require("./classes/Converter"));
exports.Converter = Converter_1.default;
var IsoDateConverter_1 = __importDefault(require("./classes/IsoDateConverter"));
exports.isoDateConverter = new IsoDateConverter_1.default(false);
exports.isoDateTimeConverter = new IsoDateConverter_1.default(true);
exports.notConverter = new Converter_1.default(function (v) { return !v; }, function (v) { return !v; });
exports.numberConverter = new Converter_1.default(function (number) {
    if (typeof number === "number") {
        return number.toString();
    }
    else {
        return number;
    }
}, function (string) {
    if (typeof string === "string") {
        return Number(string);
    }
    else {
        return string;
    }
});
var Converters = {
    isoDateConverter: exports.isoDateConverter,
    isoDateTimeConverter: exports.isoDateTimeConverter,
    numberConverter: exports.numberConverter,
    notConverter: exports.notConverter,
};
Object.freeze(Converters);
exports.default = Converters;
//# sourceMappingURL=index.js.map