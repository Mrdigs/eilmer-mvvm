"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bindings_1 = require("../../bindings");
var DateTimeConverter_1 = __importDefault(require("./DateTimeConverter"));
// From https://tc39.es/proposal-intl-datetime-style/
var DATE_STYLES = ["full", "long", "medium", "short"];
var TIME_STYLES = ["full", "long", "medium", "short"];
var DATE_TIME_FORMATS = {
    weekday: ["narrow", "short", "long"],
    year: ["2-digit", "numeric"],
    month: ["2-digit", "numeric", "narrow", "short", "long"],
    day: ["2-digit", "numeric"],
    hour: ["2-digit", "numeric"],
    minute: ["2-digit", "numeric"],
    second: ["2-digit", "numeric"],
    timeZoneName: ["short", "long"],
};
describe("DateTimeConverter supports Arabic and other numerical systems", function () {
    var date = new Date("2001-01-01 17:00:00");
    var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    var context = new bindings_1.BindingContext({}, "");
    Object.assign(options, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    var converter = new DateTimeConverter_1.default("ar-JO", options);
    var converted = converter.convertFrom(date, context);
    test("locale:'ar-JO': '".concat(converted, "'"), function () {
        var reconverted = converter.convertTo(converted, context);
        expect(converter.convertFrom(date, context)).toBe(converter.convertFrom(reconverted, context));
    });
});
describe("DateTimeConverter supports all format options", function () {
    // const date = new Date()
    var date = new Date("2001-01-01 17:00:00");
    var context = new bindings_1.BindingContext({}, "");
    DATE_STYLES.forEach(function (style) {
        var options = { dateStyle: style };
        var converter = new DateTimeConverter_1.default("de", options);
        var converted = converter.convertFrom(date, context);
        test("dateStyle:'".concat(style, "': '").concat(converted, "'"), function () {
            var reconverted = converter.convertTo(converted, context);
            expect(converter.convertFrom(date, context)).toBe(converter.convertFrom(reconverted, context));
        });
    });
    TIME_STYLES.forEach(function (style) {
        var options = { dateStyle: "long", timeStyle: style };
        var converter = new DateTimeConverter_1.default("fr", options);
        var converted = converter.convertFrom(date, context);
        test("timeStyle:'".concat(style, "': '").concat(converted, "'"), function () {
            var reconverted = converter.convertTo(converted, context);
            expect(converter.convertFrom(date, context)).toBe(converter.convertFrom(reconverted, context));
        });
    });
    Object.entries(DATE_TIME_FORMATS).forEach(function (_a) {
        var _b = __read(_a, 2), option = _b[0], values = _b[1];
        var options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        Object.assign(options, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        values.forEach(function (value) {
            options[option] = value;
            var converter = new DateTimeConverter_1.default("en", options);
            var converted = converter.convertFrom(date, context);
            test("".concat(option, ":'").concat(value, "': '").concat(converted, "'"), function () {
                var reconverted = converter.convertTo(converted, context);
                expect(converter.convertFrom(date, context)).toBe(converter.convertFrom(reconverted, context));
            });
        });
    });
});
//# sourceMappingURL=DateTimeConverter.test.js.map