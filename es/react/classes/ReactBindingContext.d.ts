export default ReactBindingContext;
declare class ReactBindingContext extends BindingContext {
    constructor(viewModel: any, propertyName: any);
    component: any;
    componentProperty: any;
    setComponentPropertiesHandler: () => boolean;
    setComponentProperties(properties: any): boolean;
}
import { BindingContext } from "../../bindings";
//# sourceMappingURL=ReactBindingContext.d.ts.map