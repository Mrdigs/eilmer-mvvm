import { Properties } from '../../properties'
import { Converter, ConverterException } from '../../converters'

import BindingContext from './BindingContext'
import { Listener } from '../../properties/types'
import IConverter from '../../converters/classes/IConverter'

/**
 * Provides a binding between an object property and a listener.
 *
 * The subscriber is notified if the property value is updated from anywhere
 * in the code, not only via the Binder.
 *
 * This class will work on any type of object providing the bound property
 * is configurable. This means that certain cases are not possible, particularly
 * with built-in object types: new Binding(new Array(), 'length') (SEE BELOW, NOT RIGHT) will trigger
 * an error, for example (the {@link Observable} class can be utilized for
 * this kind of use case).
 *
 * TODO: Note that new Binding(Object.create(new Array()), 'length') *will*
 * work!
 *
 * @example
 * const object = { count: 0 }
 * const binding = new Binding(object, 'count')
 * binding.bind((count) => {
 *   console.log('Count is now:', count)
 * })
 * setInterval(() => {
 *   binding.setValue(binding.getValue() + 1)
 * }, 1000)
 */
class Binding<T = any, K = T> {

  // At some point, replace viewModel with binder

  protected viewModel: object
  private propertyName: string
  private converter: Converter
  private subscriber: Listener
  private context: BindingContext

  protected bound = false

  /**
   * Create a new Binding. If a subscriber function is provided, then the
   * Binding is immediately to that listener on construction.
   *
   * @param {object} viewModel - The object to bind to.
   * @param {string} propertyName - The name of the property on the object.
   * @param {Converter} converter - An optional Converter.
   * @param {function} subscriber - An optional listener function.
   */
  constructor(viewModel: object, propertyName: string, converter: IConverter<T, K> = null, subscriber: Listener<T> = null) {
    if (!(viewModel && propertyName)) {
      throw new Error('viewModel and propertyName are required arguments')
    } else if (typeof propertyName !== 'string') {
      throw new TypeError('propertyName must be a string')
    } else {
      this.context = new BindingContext(viewModel, propertyName, this)
      if (converter instanceof Converter) {
        this.converter = converter
      }
      this.viewModel = viewModel
      this.propertyName = propertyName
      if (subscriber) {
        this.bind(subscriber)
      }
    }
  }

  /**
   * Returns the context for this Binding. This context is provided to the
   * Converter, if there is one. There's no good reason to retrieve it
   * genrally and so this method should not be called but is required
   * for interal purposes.
   *
   * @ignore
   */
  getContext() {
    return this.context
  }

  protected setContext(context: BindingContext) {
    this.context = context
  }

  /**
   * Binds this binding to a listener function which will be called
   * whenever the object property this Binder is bound to is updated
   * by some process.
   *
   * A Binding can only have one subscriber, so this method should only
   * be called once, unless the {@link Binding#unbind} method is called
   * beforehand.
   *
   * @param {function} subscriber - The listener function.
   */
  bind(subscriber: Listener<T>) {
    if (!this.bound) {
      const args = [this.viewModel, this.propertyName, subscriber]
      Properties.addPropertyChangeListener.apply(null, args)
      this.subscriber = subscriber
      this.bound = true
      return this.unbind.bind(this)
    } else {
      throw new Error('Binding is already bound to a subscriber')
    }
  }

  /**
   * Unbinds the bound subscriber and disposes of the Binders reference
   * to it. After this method is called, a new subscriber can be bound to
   * the Binding using the {@link Binding#bind} method.
   */
  unbind() {
    if (this.bound) {
      const args = [this.viewModel, this.propertyName, this.subscriber]
      Properties.removePropertyChangeListener.apply(null, args)
      this.subscriber = null
      this.bound = false
    }
  }

  /**
   * Sets the value of the property on the bound object. If a converter
   * has been specified, the value is converted using the converter's
   * {@link Converter#convertTo} method.
   *
   * @param value - The value to set the property to.
   */
  setValue(value: K) {
    // TODO: this should allow a function to be passed as per Reacts
    // useState hook.
    if (this.converter) {
      try {
        const converted = this.converter.convertTo(value, this.getContext())
        Properties.setPropertyValue(this.viewModel, this.propertyName, converted)
      } catch (exception) {
        if (exception instanceof ConverterException) {
          console.warn('Unhandled', exception.toString())
        } else {
          throw exception
        }
      }
    } else {
      Properties.setPropertyValue(this.viewModel, this.propertyName, value)
    }
  }

  /**
   * Retrieves the current value of the bound property. If a converter
   * has been specified, the value is converted using the converter's
   * {@link Converter#convertFrom} method.
   *
   * @returns The current property value.
   */
  getValue(): K {
    const value = Properties.getPropertyValue(this.viewModel, this.propertyName)
    if (this.converter) {
      return this.converter.convertFrom(value, this.getContext())
    }
    return value
  }

  // TODO: Unfortunately, the requirement to preserve the correct types
  // in the yeilded tuple is not yet implemented in TypeScript.
  // See: https://github.com/microsoft/TypeScript/issues/43150
  *[Symbol.iterator]() {
    const values: [K, (value: K) => {}] = [this.getValue(), this.setValue.bind(this)]
    // return values[Symbol.iterator]
    yield* values

    /*
    yield this.getValue()
    yield this.setValue.bind(this)
    */
  }

  /*
  *[Symbol.iterator]() {
    yield this.getValue()
    yield this.setValue.bind(this)
  }
  */

}


// Ok so this works great without a converter, but what about *with* a converter

class TestConverter implements IConverter<string, number> {
  convertFrom(viewModelValue: string, bindingContext: BindingContext): number {
    throw new Error('Method not implemented.')
  }
  convertTo(viewValue: number, bindingContext: BindingContext): string {
    throw new Error('Method not implemented.')
  }

}

const test = [1, "2"] as const
const [first, second] = test

// So both are string | number and that's no good.

const object = { count: 0 }
const converter = new TestConverter()
const binding = new Binding<number>(object, 'count')
const [ value, setValue ] = binding
//setValue(5)
/*
binding.bind((count: number) => {
   console.log('Count is now:', count)
})
binding.getValue() * 2
/*
setInterval(() => {
  binding.setValue(binding.getValue() + 1)
}, 1000)
*/

export default Binding
