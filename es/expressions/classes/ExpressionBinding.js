function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

import Binding from '../../bindings/classes/Binding';
import Properties from '../../properties/classes/Properties';
import VariableResolver from './VariableResolver';
import Expression from './Expression';

var _bindings = /*#__PURE__*/new WeakMap();

var _properties = /*#__PURE__*/new WeakMap();

var _expression = /*#__PURE__*/new WeakMap();

var _evaluated = /*#__PURE__*/new WeakMap();

var _viewModel = /*#__PURE__*/new WeakMap();

var _listener = /*#__PURE__*/new WeakMap();

var _resolveVariable = /*#__PURE__*/new WeakSet();

export default class ExpressionBinding extends Binding {
  constructor(viewModel, expr, converter = null, subscriber = null) {
    const expression = new Expression(expr);
    super(expression, 'result');

    _classPrivateMethodInitSpec(this, _resolveVariable);

    _classPrivateFieldInitSpec(this, _bindings, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _properties, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _expression, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _evaluated, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _viewModel, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _listener, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _listener, this.evaluate.bind(this));

    _classPrivateFieldSet(this, _expression, expression);

    _classPrivateFieldSet(this, _viewModel, viewModel);

    _classPrivateFieldSet(this, _evaluated, false);

    _classPrivateFieldSet(this, _properties, {});

    _classPrivateFieldSet(this, _bindings, []);
  }

  evaluate() {
    console.log('EVALUATING:', _classPrivateFieldGet(this, _expression));

    const resolveVariable = _classPrivateMethodGet(this, _resolveVariable, _resolveVariable2).bind(this);

    _classPrivateFieldGet(this, _expression).evaluate(new class extends VariableResolver {
      resolveVariable(name) {
        return resolveVariable(name);
      }

    }());

    _classPrivateFieldSet(this, _evaluated, true);
  }

  setValue(value) {
    throw new Error('Not supported at the moment');
  }

  getValue() {
    if (!_classPrivateFieldGet(this, _evaluated)) this.evaluate();
    super.getValue();
  }

  bind(subscriber) {
    this.getValue();
    const result = super.bind(subscriber);
    Object.entries(_classPrivateFieldGet(this, _properties)).forEach(([property, object]) => {
      let args = [object, property, _classPrivateFieldGet(this, _listener)];
      console.log('In ExpressionBinding, binding', object, property);
      Properties.addPropertyChangeListener.apply(null, args);
    });
    return result;
  }

  unbind() {
    super.unbind(subscriber);
    Object.entries(_classPrivateFieldGet(this, _properties)).forEach(([property, object]) => {
      let args = [object, property, _classPrivateFieldGet(this, _listener)];
      Properties.removePropertyChangeListener.apply(null, args);
    });
  }

}

function _resolveVariable2(name) {
  if (name[0] !== '@') {
    _classPrivateFieldGet(this, _properties)[name] = _classPrivateFieldGet(this, _viewModel);
    return Properties.getPropertyValue(_classPrivateFieldGet(this, _viewModel), name);
  } else {
    const attribute = name.slice(1);
    const attributes = this.getContext().attributes;
    _classPrivateFieldGet(this, _properties)[attribute] = attributes;
    const result = Properties.getPropertyValue(attributes, attribute); // Ok so this is *not* updating

    console.log('FOR', name, 'GOT', result);
    return result;
  }
}