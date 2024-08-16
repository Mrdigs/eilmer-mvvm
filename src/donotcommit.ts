interface IConverter<VM, V = VM> {
  convertFrom(viewModelValue: VM): V;
  convertTo(viewValue: V): VM;
}

class Binding<VM, K extends keyof VM, V = VM[K]> {
  private viewModel: VM;
  private propertyName: K;
  private converter: IConverter<VM[K], V> | null;

  constructor(
    viewModel: VM,
    propertyName: K,
    converter: IConverter<VM[K], V> | null = null
  ) {
    this.viewModel = viewModel;
    this.propertyName = propertyName;
    this.converter = converter;
  }

  getValue(): V {
    if (this.converter !== null) {
      return this.converter.convertFrom(this.viewModel[this.propertyName]);
    }
    return this.viewModel[this.propertyName] as unknown as V;
  }

  setValue(value: V): void {
    if (this.converter !== null) {
      this.viewModel[this.propertyName] = this.converter.convertTo(value);
    } else {
      this.viewModel[this.propertyName] = value as unknown as VM[K];
    }
  }
}

class NumberToString implements IConverter<number, string> {
  convertFrom(viewModelValue: number) {
    return String(viewModelValue);
  }

  convertTo(viewValue: string) {
    return Number(viewValue);
  }
}

class StringToNumber implements IConverter<string, number> {
  convertFrom(viewModelValue: string) {
    return Number(viewModelValue);
  }

  convertTo(viewValue: number) {
    return String(viewValue);
  }
}

const numberToString = new NumberToString();
const stringToNumber = new StringToNumber();
const viewModel = { id: "1", age: 31 };

{
  // The type of the id const below should be "string" as that is the type
  // of the "id" property of viewModel (not "string | number")
  const id = new Binding(viewModel, "id").getValue();
}

{
  // The type of the age const below should be "number" as that is the type
  // of the "age" property of viewModel (not "string | number")
  const age = new Binding(viewModel, "age").getValue();
}

{
  // The code below should cause a TypeScript error because the "id" property
  // is a "string" and not a "number"
  // new Binding(viewModel, "id").setValue(2);

  // The code below should cause a TypeScript error because the "age" property
  // is a "number" and not a "string"
  // new Binding(viewModel, "age").setValue("32");

  // The type of the id const below should be a "number" because an IConverter
  // has been supplied and that converts the "id" value from a "string" to a "number"
  const id = new Binding(viewModel, "id", stringToNumber).getValue();

  // The type of the age const below should be a "string" because an IConverter
  // has been supplied and that converts the "age" value from a "number" to a "string"
  const age = new Binding(viewModel, "age", numberToString).getValue();

  // The code below should not cause any compile errors because the
  // converter converts the "number" to a "string", which is the correct type for
  // the "id" property of viewModel.
  new Binding(viewModel, "id", stringToNumber).setValue(2);

  // The code below should cause a compilation error because the
  // converter converts a "number" to a "string", and therefore the argument
  // given to setValue() must be a "number"
  // new Binding(viewModel, "id", stringToNumber).setValue("2");
}

{
  class MyConverter implements IConverter<number, string> {
    convertFrom(viewModelValue: number) {
      return String(viewModelValue);
    }

    convertTo(viewValue: string) {
      return Number(viewValue);
    }
  }

  const converter = new MyConverter();
  const binding = new Binding(viewModel, "age", converter);
  const age = binding.getValue();
}

{
  const binding = new Binding<any, any, number>({}, "page");
  const page = binding.getValue();
}
