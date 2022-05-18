import React from 'react'

import Binder, { useBinderFor } from './Binder'
import { Converter, ConverterBase, ConverterException } from '../../converters'

function Binding({ vm, command, canExecute, cannotExecute, converter, children, ...props }) {
  const binder = useBinder(vm)
  const { fromConverter, toConverter } = splitConverter(converter)
  const { properties, events } = parseProps(props)
  const childProps = {}

  let eventProperty, eventBinding = null
  Object.entries(properties).forEach(([childProp, propertyName]) => {
    let binding
    if (typeof propertyName === 'string') {
      binding = binder.useBinding(propertyName, fromConverter)
    } else if (Array.isArray(propertyName)) {
      const [ property, converter ] = propertyName
      binding = binder.useBinding(property, converter)
    } else if (typeof propertyName === 'object') {
      const { property, converter } = propertyName
      binding = binder.useBinding(property, converter)
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
    const canExecuteValue = commandBinding.canExecute
    if (eventType) {
      eventBinding = null
      eventConverter = null
      childProps[eventType] = (e) => {
        commandBinding.execute(e.target[eventProperty])
      }
    }
    if (typeof canExecute === 'string') {
      childProps[canExecute] = canExecuteValue
    } else if (Array.isArray(canExecute)) {
      if (typeof canExecute[0] === 'string') {
        if (canExecute[1] instanceof Converter) {
          childProps[canExecute[0]] = canExecute[1].convertFrom(canExecuteValue)
        } else {
          childProps[canExecute[0]] = canExecuteValue
        }
      }
    } else if (typeof canExecute === 'object') {
      if (typeof canExecute.property ==='string') {
        if (canExecute.converter instanceof Converter) {
          childProps[canExecute.property] = canExecute.converter.convertFrom(canExecuteValue)
        } else {
          childProps[canExecute.property] = canExecuteValue
        }
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
      <Children {...childrenProps} {...childProps}>
        {children}
      </Children>
    )
  }
}

// TODO: THINK OF A BETTER NAME
function Children(props) {
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

        // Ok so I need to perhaps find a better way - in essence
        // it out to be part of the binding and already set up but then
        // I can't see how that's possible - although I guess I can have
        // a method on the binder, to set BOTH in a new context or something?

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
  const contextBinder = Binder.useBinder()
  const localBinder = useBinderFor(vm)
  return localBinder || contextBinder
}

// So reserved props are vm and command
// Then there are onX properties which are event types
// Anything else is passed down
function parseProps(props) {
  return Object.entries(props).reduce((parsed, [prop, value]) => {
    if (prop.substr(0, 2) === 'on') {
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
