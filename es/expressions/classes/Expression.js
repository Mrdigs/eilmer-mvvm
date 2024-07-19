"use strict";
exports.__esModule = true;
var jsep = require("jsep");
// TODO: Does this *have* to be globally set?
jsep.addIdentifierChar('@');
// TODO: I think I want a different class that will store the 
// result in this.result so that this class can just be used 
// as an simple way of evaluating expressions without it's own
// result state, while coding the new <Bind> component, but we
// will see.
var Expression = /** @class */ (function () {
    function Expression(expr) {
        this.expr = expr;
        this.astTree = jsep(expr);
    }
    Expression.prototype.evaluate = function (variableResolver) {
        this.result = evaluateAst(variableResolver, this.astTree);
        return this.result;
    };
    Expression.prototype.toString = function () {
        return this.expr;
    };
    return Expression;
}());
exports["default"] = Expression;
function evaluateAst(variableResolver, ast) {
    switch (ast.type) {
        case 'Literal':
            return ast.value;
        case 'Identifier':
            return resolveAst(variableResolver, ast.name);
        case 'MemberExpression':
            // TODO: Move this function out...
            var parse = function (ast) { var _a; return (((_a = ast.object) === null || _a === void 0 ? void 0 : _a.property) ? parse(ast.object) : ast.object.name) + '.' + ast.property.name; };
            return resolveAst(variableResolver, parse(ast));
        case 'BinaryExpression':
            var value1 = evaluateAst(variableResolver, ast.left);
            var value2 = evaluateAst(variableResolver, ast.right);
            return operateAst(ast.operator, value1, value2);
        case 'UnaryExpression':
            var value = evaluateAst(variableResolver, ast.argument);
            return operateAst(ast.operator, value);
        case 'ArrayExpression':
            // console.log('Got ArrayExpression:', ast)
            // ast.elements is an array of ast nodes to be processed
            return ast.elements.map(function (each) { return evaluateAst(variableResolver, each); });
        // throw new Error('Arrays are not supported')
        case 'CallExpression':
            // TODO: Should I support that?
            throw new Error('Function calls are not supported');
        default:
            throw new Error('Unknown AST node type: ' + ast.type);
    }
}
function resolveAst(variableResolver, name) {
    return variableResolver.resolveVariable(name);
}
function operateAst(op, value1, value2) {
    if (value2 === void 0) { value2 = null; }
    switch (op) {
        case '!':
            return !value1;
        case '<':
            return value1 < value2;
        case '>':
            return value1 > value2;
        case '<=':
            return value1 <= value2;
        case '>=':
            return value1 >= value2;
        case '=':
        case '==':
            return value1 == value2;
        case '===':
            return value1 === value2;
        case '!=':
        case '<>':
            return value1 != value2;
        case '!==':
            return value1 !== value2;
        case '-':
            return value1 - value2;
        case '+':
            return value1 + value2;
        case '*':
            return value1 * value2;
        case '/':
            return value1 / value2;
        case '%':
            return value1 % value2;
        default:
            break;
    }
}
//# sourceMappingURL=Expression.js.map