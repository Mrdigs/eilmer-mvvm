import jsep = require("jsep")
import IVariableResolver from './IVariableResolver'

// TODO: Does this *have* to be globally set?
jsep.addIdentifierChar('@')

// TODO: I think I want a different class that will store the 
// result in this.result so that this class can just be used 
// as an simple way of evaluating expressions without it's own
// result state, while coding the new <Bind> component, but we
// will see.

export default class Expression<T> {

  private expr: string
  private astTree: jsep.Expression
  result: T

  constructor(expr: string) {
    this.expr = expr
    this.astTree = jsep(expr)
  }

  evaluate(variableResolver: IVariableResolver) {
    this.result = evaluateAst(variableResolver, this.astTree)
    return this.result
  }

  toString() {
    return this.expr
  }

}

function evaluateAst(variableResolver: IVariableResolver, ast: any) {

  switch (ast.type) {
    case 'Literal':
      return ast.value
    case 'Identifier':
      return resolveAst(variableResolver, ast.name)
    case 'MemberExpression':
      // TODO: Move this function out...
      var parse = (ast) => (ast.object?.property ? parse(ast.object) : ast.object.name) + '.' + ast.property.name
      return resolveAst(variableResolver, parse(ast))
    case 'BinaryExpression':
      const value1 = evaluateAst(variableResolver, ast.left)
      const value2 = evaluateAst(variableResolver, ast.right)
      return operateAst(ast.operator, value1, value2)
    case 'UnaryExpression':
      const value = evaluateAst(variableResolver, ast.argument)
      return operateAst(ast.operator, value)
    case 'ArrayExpression':
      // console.log('Got ArrayExpression:', ast)
      // ast.elements is an array of ast nodes to be processed
      return ast.elements.map(each => evaluateAst(variableResolver, each))
      // throw new Error('Arrays are not supported')
    case 'CallExpression':
      // TODO: Should I support that?
      throw new Error('Function calls are not supported')
    default:
      throw new Error('Unknown AST node type: ' + ast.type)
  }
}

function resolveAst(variableResolver: IVariableResolver, name: string) {
  return variableResolver.resolveVariable(name)
}

function operateAst(op: string, value1: any, value2: any = null) {
  switch (op) {
    case '!':
      return !value1
    case '<':
      return value1 < value2
    case '>':
      return value1 > value2
    case '<=':
      return value1 <= value2
    case '>=':
      return value1 >= value2
    case '=':
    case '==':
      return value1 == value2
    case '===':
      return value1 === value2
    case '!=':
    case '<>':
      return value1 != value2
    case '!==':
      return value1 !== value2
    case '-':
      return value1 - value2
    case '+':
      return value1 + value2
    case '*':
      return value1 * value2
    case '/':
      return value1 / value2
    case '%':
      return value1 % value2
    default:
      break
  }
}
