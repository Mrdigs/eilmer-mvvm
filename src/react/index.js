import React from 'react'

import ViewModel from './classes/ViewModel'
import { Binder, Binding } from './components'
import { useInstanceOf, useProperty, useBinding, useProperties, useCommand, useViewModel, useEvent } from './hooks'
import ReactBindingContext from './classes/ReactBindingContext'
import ReactBindingConverter from './classes/ReactBindingConverter'

// TODO: Move all of this out. And in fact, This should maybe all become
// part of Binder, and allow viewModels to be *named*. Perhaps for a
// test, this should become NamingContext and then Binder can make use
// of it, if need be. And Binding vm parameter can either be an object
// or a string, and if a string, it looks for the named vm.

/*
const LocatorContext = React.createContext()

export function LocatorProvider({ children, ...props }) {
  const parent = React.useContext(LocatorContext)
  const provider = Object.create(parent ? parent : null)
  Object.assign(provider, props)

  return (
    <LocatorContext.Provider value={provider}>
      {children}
    </LocatorContext.Provider>
  )
}

LocatorProvider.use = function(name) {
  // This way to accessing useContext is needed for compilation
  const current = React['useContext'](LocatorContext)
  return current[name]
}
*/

export { Binder, Binding, useInstanceOf, useProperty, useBinding, useProperties, useCommand, useViewModel, useEvent }

// TODO WHY NOT JUST EXPORT FROM?
export { ReactBindingContext }
export { ReactBindingConverter }

export default {
  Binder,
  Binding,
  useProperty,
  useInstanceOf,
  useBinding,
  useProperties,
  useCommand,
  useViewModel
}
