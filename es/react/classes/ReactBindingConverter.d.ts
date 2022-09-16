export default ReactBindingConverter;
declare class ReactBindingConverter extends ConverterBase {
    convertFrom(viewModelValue: any, bindingContext: any, ...args: any[]): any;
    convertTo(viewValue: any, bindingContext: any, ...args: any[]): any;
    handleConverterException(exception: any, bindingContext: any, componentProperties: any, viewValue: any): void;
}
import { ConverterBase } from "../../converters";
//# sourceMappingURL=ReactBindingConverter.d.ts.map