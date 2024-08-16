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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isoDateTimeConverter = exports.isoDateConverter = exports.IsoDateConverter = void 0;
var ConverterException_1 = __importDefault(require("./ConverterException"));
var PARTS_MAPPING = {
    literal: {
        default: ["({0})", null, null],
    },
    year: {
        numeric: ["([0-9][0-9][0-9][0-9])", Number, Date.prototype.setFullYear],
        "2-digit": ["([0-9][0-9])", Number, Date.prototype.setYear],
    },
    month: {
        long: ["(.*)", function (v, months) { return months.indexOf(v); }, Date.prototype.setMonth],
        short: [
            "(.*)\\.?",
            function (v, months) { return months.indexOf(v); },
            Date.prototype.setMonth,
        ],
        narrow: ["(.)", function (v, months) { return months.indexOf(v); }, Date.prototype.setMonth],
        numeric: ["([0-9]?[0-9])", function (v) { return Number(v) - 1; }, Date.prototype.setMonth],
        "2-digit": ["([0-9][0-9])", function (v) { return Number(v) - 1; }, Date.prototype.setMonth],
    },
    day: {
        numeric: ["([0-9]?[0-9])", Number, Date.prototype.setDate],
        "2-digit": ["([0-9][0-9])", Number, Date.prototype.setDate],
    },
    weekday: {
        long: ["(.*)", null, null],
        short: ["(.*)", null, null],
        narrow: ["(.)", null, null],
    },
    hour: {
        numeric: ["([0-9]?[0-9])", Number, Date.prototype.setHours],
        "2-digit": ["([0-9][0-9])", Number, Date.prototype.setHours],
    },
    minute: {
        numeric: ["([0-9]?[0-9])", Number, Date.prototype.setMinutes],
        "2-digit": ["([0-9][0-9])", Number, Date.prototype.setMinutes],
    },
    second: {
        numeric: ["([0-9]?[0-9])", Number, Date.prototype.setSeconds],
        "2-digit": ["([0-9][0-9])", Number, Date.prototype.setSeconds],
    },
    timeZoneName: {
        long: ["(.*)", null, null],
        short: ["(.*)", null, null],
    },
    dayPeriod: {
        default: ["([^ ]*)", null, null],
    },
};
var DATE_STYLES = {
    full: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    },
    long: {
        year: "numeric",
        month: "long",
        day: "numeric",
    },
    medium: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    },
    short: {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
    },
};
var TIME_STYLES = {
    full: {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "long",
    },
    long: {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    },
    medium: {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    },
    short: {
        hour: "2-digit",
        minute: "2-digit",
    },
};
var DateTimeConverter = /** @class */ (function () {
    function DateTimeConverter(locale, options) {
        var _this = this;
        if (options === null || options === void 0 ? void 0 : options.timeZone) {
            throw new Error("Timezones are not supported in DateTimeConverter");
        }
        else {
            this.formatter = new Intl.DateTimeFormat(locale, options);
            this.formatOptions = this.formatter.resolvedOptions();
            if (DATE_STYLES[options === null || options === void 0 ? void 0 : options.dateStyle]) {
                Object.assign(this.formatOptions, DATE_STYLES[options.dateStyle]);
            }
            if (TIME_STYLES[options === null || options === void 0 ? void 0 : options.timeStyle]) {
                Object.assign(this.formatOptions, TIME_STYLES[options.timeStyle]);
            }
            if (this.formatOptions.numberingSystem !== "latn") {
                this.formatNumbers = getNumbersForLocale(this.formatOptions.locale);
            }
            this.formatParts = this.formatter
                .formatToParts(new Date("2001-01-01"))
                .map(function (part) {
                var mapping = PARTS_MAPPING[part.type];
                if (mapping) {
                    var format = _this.formatOptions[part.type] || "default";
                    part.value = formatString(_this.formatOptions, _this.formatNumbers, mapping[format][0], part.value);
                    return part;
                }
                else {
                    throw new Error("No mapping available for " + part.type);
                }
            });
            this.formatMonthNames = [];
            if (["long", "numeric", "2-digit", "short", "narrow"].includes(this.formatOptions["month"])) {
                var format = this.formatOptions["month"];
                var formatter = new Intl.DateTimeFormat(locale, { month: format });
                for (var month = 0; month < 12; month++) {
                    this.formatMonthNames.push(formatter.format(new Date(2022, month, 1)));
                }
            }
            if (this.formatOptions["hour12"]) {
                var am = this.formatter
                    .formatToParts(new Date("2001-01-01 06:00:00"))
                    .find(function (part) {
                    return part.type === "dayPeriod";
                });
                var pm = this.formatter
                    .formatToParts(new Date("2001-01-01 18:00:00"))
                    .find(function (part) {
                    return part.type === "dayPeriod";
                });
                this.formatDayPeriods = {
                    am: am.value,
                    pm: pm.value,
                };
            }
        }
    }
    DateTimeConverter.prototype.convertFrom = function (viewModelValue, bindingContext) {
        try {
            return this.formatter.format(viewModelValue);
        }
        catch (err) {
            throw new ConverterException_1.default(err.message);
        }
    };
    DateTimeConverter.prototype.convertTo = function (viewValue, bindingContext) {
        var _this = this;
        var date = new Date(2022, 0, 1, 0, 0, 0);
        try {
            var regex = new RegExp("^" + this.formatParts.map(function (_a) {
                var type = _a.type, value = _a.value;
                return value;
            }).join("") + "$");
            var parsed_1 = regex
                .exec(viewValue)
                .slice(1, this.formatParts.length + 1);
            if (parsed_1.length === this.formatParts.length) {
                var dayPeriodAdjustment_1 = 0;
                this.formatParts.forEach(function (part, idx) {
                    var mapping = PARTS_MAPPING[part.type];
                    if (mapping) {
                        var format = _this.formatOptions[part.type] || "default";
                        if (part.type !== "dayPeriod") {
                            if (mapping[format] && mapping[format][2]) {
                                var setFunction = mapping[format][2].bind(date);
                                var value = parseValue(_this.formatOptions, _this.formatNumbers, format, parsed_1[idx]);
                                var setValue = mapping[format][1](value, _this.formatMonthNames);
                                setFunction(setValue);
                            }
                        }
                        else if (_this.formatDayPeriods.pm === parsed_1[idx]) {
                            dayPeriodAdjustment_1 = 12;
                        }
                    }
                });
                date.setHours(date.getHours() + dayPeriodAdjustment_1);
            }
        }
        catch (err) {
            throw new ConverterException_1.default(err.message);
        }
        if (this.formatter.format(date) !== viewValue) {
            throw new ConverterException_1.default('Cannot parse date "' + viewValue + '"');
        }
        if (this.formatOptions["year"] === "short") {
            console.warn('DateTimeConverter: Using "short" year format option is not advised for 2-way bindings');
        }
        return date;
    };
    return DateTimeConverter;
}());
var IsoDateConverter = /** @class */ (function () {
    function IsoDateConverter(includeTime) {
        this.includeTime = false;
        this.includeTime = includeTime;
    }
    IsoDateConverter.prototype.convertFrom = function (viewModelValue, bindingContext) {
        if (viewModelValue) {
            var string = viewModelValue.toISOString();
            return this.includeTime ? string : string.slice(0, 10);
        }
        else {
            return null;
        }
    };
    IsoDateConverter.prototype.convertTo = function (viewValue, bindingContext) {
        var date = new Date(viewValue);
        if (date.toString() === "Invalid Date") {
            throw new ConverterException_1.default("Cannot parse date", bindingContext.propertyName, viewValue);
        }
        return date;
    };
    return IsoDateConverter;
}());
exports.IsoDateConverter = IsoDateConverter;
function getNumbersForLocale(locale) {
    var formatter = new Intl.NumberFormat(locale, { useGrouping: false });
    return __spreadArray([], __read(formatter.format(9876543210)), false).reverse();
}
function parseValue(options, numbers, type, value) {
    if (numbers && ["numeric", "2-digit"].includes(type)) {
        var parsed = new Array(value.length);
        for (var i = 0; i < value.length; i++) {
            parsed.push(numbers.indexOf(value[i]));
        }
        return parsed.join("");
    }
    return value;
}
function formatString(options, numbers, string) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var formatted = string;
    for (var arg in args) {
        var value = args[arg].replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        formatted = formatted.replace("{" + arg + "}", value);
    }
    if (numbers && formatted.includes("[0-9]")) {
        var replacement = "[".concat(numbers.join(""), "]");
        formatted = formatted.replace(/\[0-9\]/g, replacement);
    }
    return formatted;
}
exports.isoDateConverter = new IsoDateConverter(false);
exports.isoDateTimeConverter = new IsoDateConverter(true);
exports.default = DateTimeConverter;
//# sourceMappingURL=DateTimeConverter.js.map