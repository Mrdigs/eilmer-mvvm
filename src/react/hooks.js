import React from 'react'
import equal from 'fast-deep-equal'

import { Converter, ConverterException } from '../converters'
import { addPropertyChangeListener, removePropertyChangeListener } from '../properties'
import { CommandBinding, executeCommand } from '../commands'
import EventBinding from '../events/classes/EventBinding'

import ReactBinding from './classes/ReactBinding'
import ViewModel from './classes/ViewModel'

export function useViewModel(instanceClass) {
  const instance = useInstanceOf(...arguments)
  const oldInstance = React.useRef(instance)
  const [ viewModel, setViewModel ] = React.useState(() => {
    return ViewModel.from(instance)
  })

  React.useEffect(() => {
    if (instance !== oldInstance.current) {
      oldInstance.current = instance
      setViewModel(ViewModel.from(instance))
    }
  }, [instance])

  return viewModel
}

export function useInstanceOf(instanceClass) {
  const savedArgs = React.useRef()
  const args = Array.prototype.slice.call(arguments, 1)
  const InstanceFactory = instanceClass.bind.apply(instanceClass, arguments)
  const [ instance, setInstance ] = React.useState(() => new InstanceFactory())

  React.useEffect(() => {
    if (savedArgs.current && !equal(savedArgs.current, args)) {
      // Constructor arguments have change, re-instantiating
      setInstance(new InstanceFactory())
    }
    savedArgs.current = args
  }, [args])

  return instance
}

const reactRef = React.useRef
const reactState = React.useState
const reactEffect = React.useEffect

export function useBinding(instance, propertyName, converter = null) {
  if (!(instance instanceof ViewModel)) {
    const oldInstance = reactRef(instance)
    const [ state, setState ] = reactState(() => ({
      binding: new ReactBinding(instance, propertyName, converter)
    }))

    reactEffect(() => {
      if (instance !== oldInstance.current) {
        oldInstance.current = instance
        setState({
          binding: new ReactBinding(instance, propertyName, converter)
        })
      }
      return state.binding.bind(() => setState(state => ({ ...state })))
    }, [instance])

    return state.binding
  } else {
    const bindBinding = instance.useBinding.bind(instance)
    return bindBinding(propertyName, converter)
  }
}

export function useCommand(instance, commandName, converter = null) {
  if (!(instance instanceof ViewModel)) {

    const oldInstance = reactRef(instance)
    const [ state, setState ] = reactState(() => ({
      binding: new CommandBinding(instance, commandName, converter)
    }))

    reactEffect(() => {
      if (instance !== oldInstance.current) {
        oldInstance.current = instance
        setState({
          binding: new CommandBinding(instance, commandName, converter)
        })
      }
      state.binding.bind(() => setState(state => ({ ...state })))
      return state.binding.unbind.bind(state.binding)
    }, [instance])

    return state.binding
  } else {
    const bindCommand = instance.useCommand.bind(instance)
    return bindCommand(commandName, converter)
  }
}

// TODO: Do I want to allow a converter here
export function useEvent(instance, eventName, listener = null) {
  if (!(instance instanceof ViewModel)) {

    const oldInstance = reactRef(instance)
    const [ state, setState ] = reactState(() => ({
      binding: new EventBinding(instance, eventName)
    }))

    reactEffect(() => {
      if (instance !== oldInstance.current) {
        oldInstance.current = instance
        setState({
          binding: new EventBinding(instance, eventName)
        })
      }
      state.binding.bind((...args) => {
        if (typeof listener !== 'function' || listener(...args)) {
          setState(state => ({ ...state }))
        }
      })
      return state.binding.unbind.bind(state.binding)
    }, [instance])

    return state.binding

  } else {
    const bindEvent = instance.useEvent.bind(instance)
    return bindEvent(eventName, listener)
  }
}

// TODO: MAYBE I SHOULD JUST SCRAP THIS AND RENAME USEBINDING TO USE
// PROPERTY.

export function useProperty(instance, propertyName, converter = null) {
  const [ value ] = useBinding(instance, propertyName, converter)
  return value
}

export function useProperties(instance, properties) {
  const bindProperty = useProperty.bind(null, instance)
  return properties.map((propertyName) => {
    return bindProperty(propertyName)
  })
}
