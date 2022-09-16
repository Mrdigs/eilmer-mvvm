import jsep from 'jsep'
import VariableResolver from './VariableResolver'

jsep.addIdentifierChar('@')

export default class Expression {

  #expr
  #astTree
  result

  constructor(expr) {
    this.#expr = expr
    this.#astTree = jsep(expr)
  }

  evaluate(variableResolver) {
    if (variableResolver instanceof VariableResolver) {
      this.result = evaluateAst(variableResolver, this.#astTree)
    } else {
      throw new Error('A VariableResolver is required for expression evaluation')
    }
  }

  toString() {
    return this.#expr
  }

}

function evaluateAst(variableResolver, ast) {

  switch (ast.type) {
    case 'Literal':
      return ast.value
    case 'Identifier':
      return resolveAst(variableResolver, ast.name)
    case 'MemberExpression':
      // TODO: Ok, strictly speaking this is *wrong*
      // Outside the context of a binding expression, so there *needs*
      // to be some way of setting how to handle this, and use the other,
      // more proper way:
      /*
        var mexp = exp;
        var parent = this.evaluateExpression(object, mexp.object);
        return this.evaluateExpression(parent, mexp.property);
      */
      const path =  ast.object.name + '.' + ast.property.name
      return resolveAst(variableResolver, path)
    case 'BinaryExpression':
      const value1 = evaluateAst(variableResolver, ast.left)
      const value2 = evaluateAst(variableResolver, ast.right)
      return operateAst(ast.operator, value1, value2)
    case 'UnaryExpression':
      const value = evaluateAst(variableResolver, ast.argument)
      return operateAst(ast.operator, value)
    default:
      throw new Error('Unknown AST node type', exp.type)
  }
}

function resolveAst(variableResolver, name) {
  return variableResolver.resolveVariable(name)
}

function operateAst(op, value1, value2) {
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
