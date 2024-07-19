import IVariableResolver from './IVariableResolver';
export default class Expression<T> {
    private expr;
    private astTree;
    result: T;
    constructor(expr: string);
    evaluate(variableResolver: IVariableResolver): T;
    toString(): string;
}
//# sourceMappingURL=Expression.d.ts.map