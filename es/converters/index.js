"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeConverter = exports.ConverterException = exports.Converter = exports.numberConverter = exports.notConverter = exports.dateTimeConverter = exports.dateConverter = void 0;
var ConverterException_1 = __importDefault(require("./classes/ConverterException"));
exports.ConverterException = ConverterException_1.default;
// import InverseBooleanConverter from './classes/InverseBooleanConverter'
var DateTimeConverter_1 = __importStar(require("./classes/DateTimeConverter"));
exports.DateTimeConverter = DateTimeConverter_1.default;
var Converter_1 = __importDefault(require("./classes/Converter"));
exports.Converter = Converter_1.default;
exports.dateConverter = DateTimeConverter_1.isoDateConverter;
exports.dateTimeConverter = DateTimeConverter_1.isoDateTimeConverter;
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
    dateConverter: exports.dateConverter,
    dateTimeConverter: exports.dateTimeConverter,
    numberConverter: exports.numberConverter,
    notConverter: exports.notConverter,
};
Object.freeze(Converters);
exports.default = Converters;
//# sourceMappingURL=index.js.map