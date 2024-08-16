// import ViewModel from './classes/ViewModel'
import { Bind, Binder, Binding } from "./components";
import ReactBindingContext from "./classes/ReactBindingContext";
import ReactBindingConverter from "./classes/ReactBindingConverter";
import useBinding from "./hooks/useBinding";
import useCommand from "./hooks/useCommand";
import useEvent from "./hooks/useEvent";
import useNew from "./hooks/useNew";
import useExpression from "./hooks/useExpression";

export {
  Binder,
  Binding,
  Bind,
  useNew,
  useBinding,
  useCommand,
  useEvent,
  useExpression,
};

// TODO WHY NOT JUST EXPORT FROM?
export { ReactBindingContext };
export { ReactBindingConverter };

export default {
  Bind,
  Binder,
  Binding,
  useNew,
  useBinding,
  useCommand,
  useExpression,
};
