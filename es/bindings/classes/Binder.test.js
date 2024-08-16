"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Binder_1 = __importDefault(require("./Binder"));
describe("Binding tests", function () {
    var viewModel = {
        name: { firstName: "John", lastName: "Doe" },
        sex: "MALE",
    };
    var binder = new Binder_1.default(viewModel);
    test("Gets, sets and listens for property changes", function () {
        // Ok so "value" has a type of unknown, but it should be known!
        var value = binder.bindProperty("sex").getValue();
        value.toUpperCase();
        /*
        let notifiedValue;
        const binding = new Binding(viewModel.name, "firstName");
        binding.bind((value) => (notifiedValue = value));
        expect(binding.getValue()).toBe("John");
        binding.setValue("Jane");
        expect(binding.getValue()).toBe("Jane");
        expect(notifiedValue).toBe("Jane");
        expect(viewModel.name.firstName).toBe("Jane");
        */
    });
});
//# sourceMappingURL=Binder.test.js.map