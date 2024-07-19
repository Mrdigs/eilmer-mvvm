import BindingContext from './BindingContext';
import { Listener } from '../../properties/types';
import IConverter from '../../converters/classes/IConverter';
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
declare class Binding<T = any, K = T> {
    protected viewModel: object;
    private propertyName;
    private converter;
    private subscriber;
    private context;
    protected bound: boolean;
    /**
     * Create a new Binding. If a subscriber function is provided, then the
     * Binding is immediately to that listener on construction.
     *
     * @param {object} viewModel - The object to bind to.
     * @param {string} propertyName - The name of the property on the object.
     * @param {Converter} converter - An optional Converter.
     * @param {function} subscriber - An optional listener function.
     */
    constructor(viewModel: object, propertyName: string, converter?: IConverter<T, K>, subscriber?: Listener<T>);
    /**
     * Returns the context for this Binding. This context is provided to the
     * Converter, if there is one. There's no good reason to retrieve it
     * genrally and so this method should not be called but is required
     * for interal purposes.
     *
     * @ignore
     */
    getContext(): BindingContext;
    protected setContext(context: BindingContext): void;
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
    bind(subscriber: Listener<T>): any;
    /**
     * Unbinds the bound subscriber and disposes of the Binders reference
     * to it. After this method is called, a new subscriber can be bound to
     * the Binding using the {@link Binding#bind} method.
     */
    unbind(): void;
    /**
     * Sets the value of the property on the bound object. If a converter
     * has been specified, the value is converted using the converter's
     * {@link Converter#convertTo} method.
     *
     * @param value - The value to set the property to.
     */
    setValue(value: K): void;
    /**
     * Retrieves the current value of the bound property. If a converter
     * has been specified, the value is converted using the converter's
     * {@link Converter#convertFrom} method.
     *
     * @returns The current property value.
     */
    getValue(): K;
    [Symbol.iterator](): Generator<K | ((value: K) => {}), void, undefined>;
}
export default Binding;
//# sourceMappingURL=Binding.d.ts.map