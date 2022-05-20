import React from 'react'

import Binder, { useBinderFor } from './Binder'
import { Converter, ConverterBase, ConverterException } from '../../converters'

function Binding({ vm, command, converter, children, ...props }) {
  if (Array.isArray(children)) {
    throw new Error('Binding accepts only one child Component')
  } else {
    const binder = useBinder(vm)
    const htmlChild = typeof children.type === 'string'
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

    if (command) {
      const commandEvent = specifiedEvent || (htmlChild ? 'onClick' : null)
      if (commandEvent) {
        const [ commandName, converter ] = deconstructProperty(command, 'command')
        const commandBinding = binder.useCommand(command, converter || fromConverter)
        const commandHandler = commandBinding.execute.bind(commandBinding)
        const eventHandler = createEventHandler(eventProperty, commandHandler)
        childProps[commandEvent] = eventHandler
      }
    } else {
      const bindingEvent = specifiedEvent || (htmlChild ? 'onChange' | null)
      if (bindingEvent && events[bindingEvent] !== false) {
        childProps.eventType = bindingEvent
        childProps.eventConverter = toConverter
        childProps.eventBinding = eventBinding
      }
    }

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
    const context = eventBinding.getContext()
    const eventProperty = context.componentProperty
    childProps[eventType] = createEventHandler(eventProperty, (value) => {
      if (eventConverter) {
        // Maybe rename this, as it will only ever be an html element
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
    })
  }

  if (typeof children === 'function') {
    return children(childProps)
  } else {
    if (typeof children.type === 'string') childProps.ref = ref
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
      if (typeof value === 'boolean') {
        parsed.events[prop] = value
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

function createEventHandler(eventProperty, handler) {
  return (eventOrValue) => {
    if (eventOrValue.target instanceof window.HTMLElement) {
      handler(eventOrValue.target[eventProperty])
    } else {
      handler(eventOrValue)
    }
  }
}

Binder.Binding = Binding
export default Binding
