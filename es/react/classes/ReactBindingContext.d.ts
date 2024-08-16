import { BindingContext } from "../../bindings";
declare class ReactBindingContext extends BindingContext {
    component: any;
    componentProperty: any;
    setComponentPropertiesHandler: () => boolean;
    constructor(viewModel: object, propertyName: string);
    setComponentProperties(properties: any): void;
}
export default ReactBindingContext;
//# sourceMappingURL=ReactBindingContext.d.ts.map