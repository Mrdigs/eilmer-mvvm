import Properties from "../../properties/classes/Properties";
import IVariableResolver from "./IVariableResolver";

export default class ObjectVariableResolver implements IVariableResolver {
    
    private context: object

    constructor(context: object) {
        this.context = context
    }
    
    resolveVariable(variableName: string) {
        return Properties.getPropertyValue(this.context, variableName)
    }
    
}