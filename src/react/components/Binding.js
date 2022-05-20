import React from 'react'

import Binder, { useBinderFor } from './Binder'
import { Converter, ConverterBase, ConverterException } from '../../converters'

function Binding({ vm, command, canExecute, converter, children, ...props }) {
  const binder = useBinder(vm)
  const { fromConverter, toConverter } = splitConverter(converter)
  const { properties, events } = parseProps(props)
  const childProps = {}

  let eventProperty, eventBinding = null
  Object.entries(properties).forEach((each) => {
    let binding = null, propertyName = each[0], childProp = each[1]
    if (typeof childProp === 'string') {
      binding = binder.useBinding(propertyName, fromConverter)
    } else if (Array.isArray(childProp)) {
      const [ property, converter ] = childProp
      binding = binder.useBinding(propertyName, converter)
      childProp = property
    } else if (typeof childProp === 'object') {
      const { property, converter } = childProp
      binding = binder.useBinding(propertyName, converter)
      childProp = property
    }
    eventBinding = eventBinding || binding
    eventProperty = eventProperty || childProp
    childProps[childProp] = binding.getValue()
    binding.getContext().componentProperty = childProp
  })

  let eventConverter = toConverter, commandBinding
  // TODO: As this now triggers a re-render, it's a good idea
  // to move it into the child component I think...
  // TODO: Allow the command to be an object like the props above
  if (command) {
    if (typeof command === 'string') {
      // TODO: I *think* I only need fromConverter here....
      commandBinding = binder.useCommand(command, fromConverter)
      // commandBinding = binder.useCommand(command, converter)
    } else if (Array.isArray(command)) {
      commandBinding = binder.useCommand(command[0], command[1])
    } else if (typeof command === 'object') {
      commandBinding = binder.useCommand(command.command, command.converter)
    }
  }

  const defaultEvent = commandBinding ? 'onClick' : 'onChange'

  let eventType = events[defaultEvent] !== false ? defaultEvent : null
  Object.entries(events).reduce((handled, [event, handle]) => {
    if (handle) eventType = event
    return handled || handle
  }, false)

  if (commandBinding) {
    let canExecuteValue = commandBinding.canExecute()
    let canExecuteProperty, canExecuteConverter
    if (eventType) {
      eventBinding = null
      eventConverter = null
      childProps[eventType] = (e) => {
        commandBinding.execute(e.target[eventProperty])
      }
    }
    if (typeof canExecute === 'string') {
      canExecuteProperty = canExecute
    } else if (Array.isArray(canExecute)) {
      if (typeof canExecute[0] === 'string') {
        canExecuteProperty = canExecute[0]
        if (canExecute[1] instanceof Converter) {
          canExecuteConverter = canExecute[1]
        }
      }
    } else if (typeof canExecute === 'object') {
      if (typeof canExecute.property ==='string') {
        canExecuteProperty = canExecute.property
        if (canExecute.converter instanceof Converter) {
          canExecuteConverter = canExecute.converter
        }
      }
    }
    if (canExecuteProperty) {
      // TODO: swap property props definitions round so they can
      // work like this, too: e.g firstName="value" rather than value="firstName"
      if (canExecuteProperty[0] === '!') {
        canExecuteProperty = canExecuteProperty.substr(1)
        canExecuteValue = !canExecuteValue
      }
      if (canExecuteConverter instanceof Converter) {
        childProps[canExecuteProperty] = canExecuteConverter.convertFrom(canExecuteValue)
      } else {
        childProps[canExecuteProperty] = canExecuteValue
      }
    }
  }

  const childrenProps = {
    eventType,
    eventBinding,
    eventConverter,
  }

  if (Array.isArray(children)) {
    throw new Error('Binding accepts only one child Component')
  } else {
    return (
      <BoundChild {...childrenProps} {...childProps}>
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

  if (eventBinding) {
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
