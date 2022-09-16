import Binding from '../../bindings/classes/Binding'
import Properties from '../../properties/classes/Properties'
import VariableResolver from './VariableResolver'
import Expression from './Expression'

export default class ExpressionBinding extends Binding {

  #bindings
  #properties
  #expression
  #evaluated
  #viewModel
  #listener

  constructor(viewModel, expr, converter = null, subscriber = null) {
    const expression = new Expression(expr)
    super(expression, 'result')
    this.#listener = this.evaluate.bind(this)
    this.#expression = expression
    this.#viewModel = viewModel
    this.#evaluated = false
    this.#properties = {}
    this.#bindings = []
  }

  #resolveVariable(name) {
    if (name[0] !== '@') {
      this.#properties[name] = this.#viewModel
      return Properties.getPropertyValue(this.#viewModel, name)
    } else {
      const attribute = name.slice(1)
      const attributes = this.getContext().attributes
      
      this.#properties[attribute] = attributes
      const result = Properties.getPropertyValue(attributes, attribute)
      // Ok so this is *not* updating
      console.log('FOR', name, 'GOT', result)
      return result
    }
  }

  evaluate() {
    console.log('EVALUATING:', this.#expression)
    const resolveVariable = this.#resolveVariable.bind(this)
    this.#expression.evaluate(new class extends VariableResolver {
      resolveVariable(name) {
        return resolveVariable(name)
      }
    })
    this.#evaluated = true
  }

  setValue(value) {
    throw new Error('Not supported at the moment')
  }

  getValue() {
    if (!this.#evaluated) this.evaluate()
    super.getValue()
  }

  bind(subscriber) {
    this.getValue()
    const result = super.bind(subscriber)
    Object.entries(this.#properties).forEach(([property, object]) => {
      let args = [object, property, this.#listener]
      console.log('In ExpressionBinding, binding', object, property)
      Properties.addPropertyChangeListener.apply(null, args)
    })
    return result
  }

  unbind() {
    super.unbind(subscriber)
    Object.entries(this.#properties).forEach(([property, object]) => {
      let args = [object, property, this.#listener]
      Properties.removePropertyChangeListener.apply(null, args)
    })
  }

}
