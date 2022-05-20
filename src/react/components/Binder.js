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
  const oldVm = React.useRef(vm)
  const [ binder, setBinder ] = React.useState(() => (
    vm ? new ReactBinder(vm) : null
  ))

  React.useEffect(() => {
    if (oldVm.current !== vm) {
      oldVm.current = vm
      setBinder(() => (
        vm ? new ReactBinder(vm) : null
      ))
    }
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
