import Binder from "./Binder";

describe("Binding tests", () => {
  const viewModel = {
    name: { firstName: "John", lastName: "Doe" },
    sex: "MALE",
  };
  const binder = new Binder(viewModel);
  test("Gets, sets and listens for property changes", () => {
    // Ok so "value" has a type of unknown, but it should be known!
    const value = binder.bindProperty("sex").getValue();
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
