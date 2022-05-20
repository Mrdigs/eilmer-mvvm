import React from 'react'

import Binder, { useBinderFor } from './Binder'
import { Converter, ConverterBase, ConverterException } from '../../converters'

function Binding({ vm, command, canExecute, converter, children, ...props }) {
  const binder = useBinder(vm)
  const { fromConverter, toConverter } = splitConverter(converter)
  const { properties, events } = parseProps(props)
  const childProps = {}

  // eventProperty is the property of the *child* whose value is to be
  // set on the vm, which is the 1st property binding found in the args
  let eventProperty, eventBinding = null
  Object.entries(properties).forEach(([ childProp, value ]) => {
    const [ propertyName, converter ] = deconstructProperty(value)
    if (propertyName && childProp) {
      const binding = binder.useBinding(propertyName, converter || fromConverter)
      eventBinding = eventBinding || binding
      eventProperty = eventProperty || childProp
      childProps[childProp] = binding.getValue()
      binding.getContext().componentProperty = childProp
    }
  })

  let specifiedEvent
  Object.entries(events).find(([event, handle]) => {
    if (handle) specifiedEvent = event
    return handle
  })

  // TODO: As this now triggers a re-render, it's a good idea
  // to move it into the child component I think...
  if (command) {
    const commandEvent = specifiedEvent || 'onClick'
    const [ commandName, converter ] = deconstructProperty(command, 'command')
    const commandBinding = binder.useCommand(command, converter || fromConverter)
    // So here: there is an assumption that this is a DOM event
    // and it *might* not be....
    childProps[commandEvent] = (e) => {
      commandBinding.execute(e.target[eventProperty])
    }
  } else {
    const bindingEvent = specifiedEvent || 'onChange'
    if (events[bindingEvent] !== false) {
      childProps.eventType = bindingEvent
      childProps.eventConverter = toConverter
      childProps.eventBinding = eventBinding
    }
  }

  if (Array.isArray(children)) {
    throw new Error('Binding accepts only one child Component')
  } else {
    return (
      <BoundChild {...childProps}>
        {children}
      </BoundChild>
    )
  }
}

function BoundChild(props) {
  const ref = React.useRef()
  const defaultState = { componentProps: props, converterProps: {}}
  const [ savedProps, setSavedProps ] = React.useState(defaultState)
  const { eventType, eventBinding, eventConverter, children, ...childProps } = savedProps.componentProps
  Object.assign(childProps, savedProps.converterProps)
  childProps.ref = ref

  React.useEffect(() => {
    setSavedProps(savedProps => ({
      componentProps: props, convertProps: savedProps.converterProps
    }))
  }, [props])

  // Also, I can have a hook useBinder() which provides the context as well,
  // and so child components can actually have infomation and even store or
  // retreive information from it - such as whether all of the bindings are
  // valid and up to date - rather like CanExecute in WPF

  if (eventBinding && eventType) {
    // So here: there is an assumption that this is a DOM event
    // and it *might* not be....
    childProps[eventType] = (e) => {
      const context = eventBinding.getContext()
      const value = e.target[context.componentProperty]
      if (eventConverter) {
        context.component = ref.current
        context.setComponentPropertiesHandler = (converterProps) => {
          setSavedProps(savedProps => ({
            componentProps: savedProps.componentProps, converterProps
          }))
          return true
        }
        try {
          eventBinding.setValue(eventConverter.convertTo(value, context))
        } catch (exception) {
          if (exception instanceof ConverterException && !exception.handled) {
            console.warn('Unhandled', exception.toString())
          }
        }
      } else {
        eventBinding.setValue(value)
      }
    }
  }

  if (typeof children === 'function') {
    return children(childProps)
  } else {
    return React.cloneElement(children, childProps)
  }
}

function useBinder(vm) {
  const localBinder = useBinderFor(vm)
  return localBinder || Binder.useBinder()
}

function parseProps(props) {
  return Object.entries(props).reduce((parsed, [prop, value]) => {
    if (prop.substr(0, 2) === 'on') {
      // TODO: Shouldn't this be a boolean?
      if (typeof value === 'string') {
        parsed.events[prop] = value
      /*
      // Actually I don't think I do want to, do I?
      // Or do I? Keep it here but commented in case
      } else if (Array.isArray(value)) {
        if (typeof value[0] === 'string') {
          parsed.events[prop] = value
        }
      } else if (typeof value === 'object') {
        if (typeof value.property === 'string') {
          parsed.events[prop] = value
        }
      */
      }
    } else if (typeof value === 'string') {
      parsed.properties[prop] = value
    } else if (Array.isArray(value)) {
      if (typeof value[0] === 'string') {
        parsed.properties[prop] = value
      }
    } else if (typeof value === 'object') {
      if (typeof value.property === 'string') {
        parsed.properties[prop] = value
      }
    }
    return parsed
  }, {
    properties: {},
    events: {}
  })
}

function deconstructProperty(propertyValue, propertyProp = 'property') {
  if (typeof propertyValue === 'string') {
    return [ propertyValue ]
  } else if (Array.isArray(propertyValue)) {
    return [ propertyValue[0], propertyValue[1] ]
  } else if (typeof propertyValue === 'object') {
    return [ propertyValue[propertyProp], propertyValue.converter ]
  }
  return []
}

function splitConverter(converter) {
  let fromConverter, toConverter = null
  if (converter instanceof Converter) {
    fromConverter = new Converter(converter.convertFrom.bind(converter), null)
    toConverter = new Converter(null, converter.convertTo.bind(converter))
  }
  return {
    fromConverter,
    toConverter
  }
}

Binder.Binding = Binding
export default Binding
