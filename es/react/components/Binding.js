import React from 'react';
import Binder, { useBinderFor } from './Binder';
import Converter from '../../converters/classes/Converter';
import Command from '../../commands/classes/Command'; //import Event from '../../events/classes/Event'
//import Action from '../../actions/classes/Action'

import ExpressionBinding from '../../expressions/classes/ExpressionBinding';

function Binding({
  vm,
  converter,
  children,
  ...props
}) {
  if (Array.isArray(children)) {
    throw new Error('Binding accepts only one child Component');
  } else {
    const childProps = {};
    const binder = useBinder(vm);
    const viewModel = binder.viewModel;

    if (children.type === 'input' || children.type === 'select') {
      const propNames = Object.keys(props);

      if (propNames.includes('value') && !propNames.includes('onChange')) {
        props.onChange = '@value';
      }
    }

    const commandBindings = {};
    childProps.propertyBindings = {};
    Object.entries(props).reduce((result, entry) => {
      result.push(new BindProperty(entry[0], entry[1]));
      return result;
    }, []).sort((a, b) => a.compareTo(b)).forEach(property => {
      if (property.isExpression) {
        // Expression Binding
        const expression = /^#{(.*)}$/.exec(property.value)[1];
        const binding = binder.useExpression(expression);
        binding.getContext().componentProperty = property.name; // But I also don't want to pollute the expression binding with
        // handling specifically for this.

        Object.assign(binding.getContext().attributes, childProps.propertyBindings);
        Object.assign(binding.getContext().attributes, commandBindings);
        childProps.propertyBindings[property.name] = binding;
        childProps[property.name] = binding.getValue();
      } else if (property.isReference) {
        // Reference Binding
        const value = property.value.slice(1);
        let binding = childProps.propertyBindings[value];

        if (typeof binding !== 'undefined') {
          const handler = binding.setValue.bind(binding);
          const eventHandler = createEventHandler(value, handler);
          childProps[property.name] = eventHandler;
        } else {
          console.warn(property.name, 'value "' + property.value + '" does not exist');
        }
      } else {
        const currentValue = viewModel[property.value];

        if (property.isEvent || currentValue instanceof Command || typeof currentValue === 'function') {
          // Command Binding
          // console.log('Binding command: ', property.name, property.value)
          const binding = binder.useCommand(property.value, property.converter);
          commandBindings[property.name] = binding;
          const handler = binding.execute.bind(binding); // I *do* need a proper event handler, but it needs to loose the event
          // and just pass through all other arguments
          // const eventHandler = createEventHandler(eventProperty, commandHandler)
          // childProps[commandEvent] = eventHandler

          childProps[property.name] = handler;
        } else {
          // Property Binding
          const binding = binder.useBinding(property.value, property.converter || converter);
          binding.getContext().componentProperty = property.name;
          childProps.propertyBindings[property.name] = binding;
          childProps[property.name] = binding.getValue();
        }
      }
    });
    console.log('CHILD PROPS:', childProps);
    return /*#__PURE__*/React.createElement(BoundChild, childProps, children);
  }
}

function BoundChild(props) {
  const ref = React.useRef();
  const defaultState = {
    componentProps: props,
    converterProps: {}
  };
  const [savedProps, setSavedProps] = React.useState(defaultState);
  const {
    propertyBindings,
    children,
    ...childProps
  } = savedProps.componentProps;
  Object.assign(childProps, savedProps.converterProps);
  React.useEffect(() => {
    setSavedProps(savedProps => ({
      componentProps: props,
      convertProps: savedProps.converterProps
    }));
  }, [props]);

  if (propertyBindings) {
    Object.values(propertyBindings).forEach(binding => {
      binding.getContext().setComponentPropertiesHandler = converterProps => {
        setSavedProps(savedProps => ({
          componentProps: savedProps.componentProps,
          converterProps
        }));
        return true;
      };
    });
  }

  if (Object(children.props) === children.props) {
    for (var prop in childProps) {
      if (typeof childProps[prop] === 'undefined') {
        if (children.props[prop] !== 'undefined') {
          delete childProps[prop];
        }
      }
    }
  }

  if (typeof children === 'function') {
    return children(childProps);
  } else {
    if (typeof children.type === 'string') childProps.ref = ref;
    return /*#__PURE__*/React.cloneElement(children, childProps);
  }
}

class BindProperty {
  name = null;
  value = null;
  converter = null;
  isReference = false;
  isExpression = false;
  isEvent = false;

  constructor(name, value) {
    this.name = name;

    if (Array.isArray(value)) {
      this.value = value[0];

      if (value[1] instanceof Converter) {
        this.converter = value[1];
      }
    } else {
      this.value = value;
    }

    this.isEvent = /^on[A-Z].*$/.test(name);
    this.isExpression = /^#{.*}$/.test(value);
    this.isReference = typeof value === 'string' && value[0] === '@';
    this.isReference = this.isReference || this.isExpression && value.includes('@');
  }

  compareTo(that) {
    if (typeof this.value !== typeof that.value) {
      return typeof this.value === 'string' ? -1 : 1;
    } else if (this.isReference !== that.isReference) {
      return !this.isReference ? -1 : 1;
    } else if (this.isEvent !== that.isEvent) {
      return !this.isEvent ? -1 : 1;
    }

    return 0;
  }

}

function useBinder(vm) {
  const localBinder = useBinderFor(vm);
  return localBinder || Binder.useBinder();
}

function createEventHandler(eventProperty, handler) {
  return eventOrValue => {
    if (eventOrValue.target instanceof window.HTMLElement) {
      handler(eventOrValue.target[eventProperty]);
    } else {
      handler(eventOrValue);
    }
  };
}

Binder.Binding = Binding;
export default Binding;