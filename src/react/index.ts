// import ViewModel from './classes/ViewModel'
import { Bind, Binder, Binding } from "./components"
import ReactBindingContext from "./classes/ReactBindingContext"
import ReactBindingConverter from "./classes/ReactBindingConverter"
import useBinding from "./hooks/useBinding"
import useCommand from "./hooks/useCommand"
import useEvent from "./hooks/useEvent"
import useNew from "./hooks/useNew"
import useProperty from "./hooks/useProperty"
import useExpression from "./hooks/useExpression"

export {
  Binder,
  Binding,
  Bind,
  useNew,
  useProperty,
  useBinding,
  useCommand,
  useEvent,
  useExpression,
}

// TODO WHY NOT JUST EXPORT FROM?
export { ReactBindingContext }
export { ReactBindingConverter }

export default {
  Bind,
  Binder,
  Binding,
  useProperty,
  useNew,
  useBinding,
  useCommand,
  useExpression,
}
