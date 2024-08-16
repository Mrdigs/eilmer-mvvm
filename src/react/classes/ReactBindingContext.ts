import { BindingContext } from "../../bindings";

class ReactBindingContext extends BindingContext {
  component = undefined;
  componentProperty = undefined;

  // I really need a nicer way of doing this, BUT
  // THIS WILL DO FOR THE TIME BEING
  setComponentPropertiesHandler = () => false;

  constructor(viewModel: object, propertyName: string) {
    super(viewModel, propertyName);
  }

  // TODO: I don't even know if I need this anymore
  setComponentProperties(properties) {
    // return this.setComponentPropertiesHandler(properties);
  }
}

export default ReactBindingContext;
