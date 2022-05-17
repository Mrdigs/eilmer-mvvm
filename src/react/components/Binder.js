import React from 'react'
import PropTypes from 'prop-types'

import ReactBinder from '../classes/ReactBinder'

const BinderContext = React.createContext()

function Binder({ vm, children }) {
  const binder = useBinderFor(vm)

  return (
    <BinderContext.Provider value={binder}>
      {children}
    </BinderContext.Provider>
  )
}

export function useBinderFor(vm) {
  const [ binder, setBinder ] = React.useState(() => (
    vm ? new ReactBinder(vm) : null
  ))

  React.useEffect(() => {
    // TODO: is this going to cause a double initial render?
    // Needs testing and a ref used if so....
    setBinder(() => (
      vm ? new ReactBinder(vm) : null
    ))
  }, [vm])

  return binder
}

Binder.useBinder = function() {
  return React.useContext(BinderContext)
}

Binder.Context = BinderContext

Binder.propTypes = {
  vm: PropTypes.object.isRequired
}

export default Binder
