export default ReactBinder;
declare class ReactBinder extends Binder {
    useProperty(propertyName: any, converter: any): any;
    useBinding(propertyName: any, converter: any): any;
    useCommand(commandName: any, converter: any, listener: any): any;
    useExpression(expression: any): any;
    useEvent(eventName: any, listener: any): any;
}
import Binder from "../../bindings/classes/Binder";
//# sourceMappingURL=ReactBinder.d.ts.map