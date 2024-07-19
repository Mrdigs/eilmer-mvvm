import Binding from '../../bindings/classes/Binding'
import Properties from '../../properties/classes/Properties'
import IVariableResolver from './IVariableResolver'
import Expression from './Expression'
import IConverter from '../../converters/classes/IConverter'
import { Listener } from '../../properties/types'

export default class ExpressionBinding<T = any, K = T> extends Binding<T, K> {

  private properties
  private expression: Expression<T>
  private evaluated: boolean
  private listener

  private myViewModel: object
  private variableResolver: IVariableResolver

  constructor(viewModel: object, expr: string, converter: IConverter<T, K> = null) {
    const expression = new Expression<T>(expr)
    super(expression, 'result', converter)
    this.listener = this.evaluate.bind(this)
    this.variableResolver = new VariableResolver(this.resolveVariable.bind(this))
    this.expression = expression
    this.myViewModel = viewModel
    this.evaluated = false
    this.properties = {}
  }

  private resolveVariable(name: string) {
    console.log('Resolving variable:', name)
    if (name[0] !== '@') {
      this.properties[name] = this.myViewModel
      return Properties.getPropertyValue(this.myViewModel, name)
    } else {
      throw new Error('No longer implementing')
      const attribute = name.slice(1)
      const attributes = this.getContext().attributes
      
      this.properties[attribute] = attributes
      const result = Properties.getPropertyValue(attributes, attribute)

      return result
    }
  }

  evaluate() {
    this.expression.evaluate(this.variableResolver)
    this.evaluated = true
  }

  setValue(value: K) {
    throw new Error('Not supported at the moment')
  }

  getValue() {
    if (!this.evaluated) this.evaluate()
    return super.getValue()
  }

  // TODO: Is T the actual correct type?
  bind(subscriber: Listener<T>) {
    this.getValue()
    const result = super.bind(subscriber)
    Object.entries(this.properties).forEach(([property, object]) => {
      let args = [object, property, this.listener]
      Properties.addPropertyChangeListener.apply(null, args)
    })
    return result
  }

  unbind() {
    super.unbind()
    Object.entries(this.properties).forEach(([property, object]) => {
      let args = [object, property, this.listener]
      Properties.removePropertyChangeListener.apply(null, args)
    })
  }

  *[Symbol.iterator]() {
    yield this.getValue()
  }
}

class VariableResolver implements IVariableResolver {

  private resolveFunction: (name: string) => any

  constructor(resolveFunction: (name: string) => any) {
    this.resolveFunction = resolveFunction
  }

  resolveVariable(variableName: string) {
    return this.resolveFunction(variableName)
  }
  
}