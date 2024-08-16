"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Binding_1 = __importDefault(require("./Binding"));
var Converter_1 = __importDefault(require("../../converters/classes/Converter"));
describe("Binding tests", function () {
    var viewModel = {
        name: { firstName: "John", lastName: "Doe", age: 31 },
        sex: "MALE",
    };
    test("Gets, sets and listens for property changes", function () {
        var notifiedValue;
        var binding = new Binding_1.default(viewModel.name, "firstName");
        binding.bind(function (value) { return (notifiedValue = value); });
        expect(binding.getValue()).toBe("John");
        binding.setValue("Jane");
        expect(binding.getValue()).toBe("Jane");
        expect(notifiedValue).toBe("Jane");
        expect(viewModel.name.firstName).toBe("Jane");
    });
    test("Property paths work as expected", function () {
        var binding = new Binding_1.default(viewModel, "name.firstName");
        expect(binding.getValue()).toBe("Jane");
        binding.setValue("John");
        expect(viewModel.name.firstName).toBe("John");
    });
    test("Converter is applied correctly", function () {
        var converter = new Converter_1.default(function (v) { return v.toLowerCase(); }, function (v) { return v.toUpperCase(); });
        var binding = new Binding_1.default(viewModel, "sex", converter);
        expect(binding.getValue()).toBe("male");
        binding.setValue("female");
        expect(viewModel.sex).toBe("FEMALE");
    });
    // TODO: Unfortunately doesn't work in TypeScript
    /*
    test("Binding deconstructs into value and setter function", () => {
      const [sex, setSex] = new Binding(viewModel, "sex");
      expect(sex).toBe("FEMALE");
      expect(typeof setSex).toBe("function");
      setSex("MALE");
      expect(viewModel.sex).toBe("MALE");
    });
    */
    test("Only one listener can be subscribed at once", function () {
        var binding = new Binding_1.default(viewModel.name, "lastName");
        var unbind = binding.bind(function () { });
        expect(function () { return binding.bind(function () { }); }).toThrow();
        unbind();
        expect(function () { return binding.bind(function () { }); }).not.toThrow();
    });
});
/*
class TestConverter implements IConverter<string, number> {
  convertFrom(viewModelValue: string, bindingContext: BindingContext): number {
    throw new Error("Method not implemented.");
  }
  convertTo(viewValue: number, bindingContext: BindingContext): string {
    throw new Error("Method not implemented.");
  }
}

const test = [1, "2"] as const;
const [first, second] = test;

// So both are string | number and that's no good.

const object = { count: 0 };
const converter = new TestConverter();
const binding = new Binding(object, "count");
const [value, setValue] = binding;

const array = [];
const arrayBinding = new Binding(array, "length");

//setValue(5)
/*
binding.bind((count: number) => {
   console.log('Count is now:', count)
})
binding.getValue() * 2
/*
setInterval(() => {
  binding.setValue(binding.getValue() + 1)
}, 1000)
*/
//# sourceMappingURL=Binding.test.js.map