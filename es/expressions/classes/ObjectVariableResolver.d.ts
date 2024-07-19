import IVariableResolver from "./IVariableResolver";
export default class ObjectVariableResolver implements IVariableResolver {
    private context;
    constructor(context: object);
    resolveVariable(variableName: string): any;
}
//# sourceMappingURL=ObjectVariableResolver.d.ts.map