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
exports.__esModule = true;
var Binding_1 = require("./Binding");
var Converter_1 = require("../../converters/classes/Converter");
describe('Binding tests', function () {
    var viewModel = { name: { firstName: 'John', lastName: 'Doe' }, sex: 'MALE' };
    test('Gets, sets and listens for property changes', function () {
        var notifiedValue;
        var binding = new Binding_1["default"](viewModel.name, 'firstName');
        binding.bind(function (value) { return (notifiedValue = value); });
        expect(binding.getValue()).toBe('John');
        binding.setValue('Jane');
        expect(binding.getValue()).toBe('Jane');
        expect(notifiedValue).toBe('Jane');
        expect(viewModel.name.firstName).toBe('Jane');
    });
    test('Property paths work as expected', function () {
        var binding = new Binding_1["default"](viewModel, 'name.firstName');
        expect(binding.getValue()).toBe('Jane');
        binding.setValue('John');
        expect(viewModel.name.firstName).toBe('John');
    });
    test('Converter is applied correctly', function () {
        var converter = new Converter_1["default"](function (v) { return v.toLowerCase(); }, function (v) { return v.toUpperCase(); });
        var binding = new Binding_1["default"](viewModel, 'sex', converter);
        expect(binding.getValue()).toBe('male');
        binding.setValue('female');
        expect(viewModel.sex).toBe('FEMALE');
    });
    test('Binding deconstructs into value and setter function', function () {
        var _a = __read(new Binding_1["default"](viewModel, 'sex'), 2), sex = _a[0], setSex = _a[1];
        expect(sex).toBe('FEMALE');
        expect(typeof setSex).toBe('function');
        setSex('MALE');
        expect(viewModel.sex).toBe('MALE');
    });
    test('Only one listener can be subscribed at once', function () {
        var binding = new Binding_1["default"](viewModel.name, 'lastName');
        var unbind = binding.bind(function () { });
        expect(function () { return binding.bind(function () { }); }).toThrow();
        unbind();
        expect(function () { return binding.bind(function () { }); }).not.toThrow();
    });
});
//# sourceMappingURL=Binding.test.js.map