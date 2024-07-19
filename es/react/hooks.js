"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.useExpression = void 0;
var ExpressionBinding_1 = require("../expressions/classes/ExpressionBinding");
var react_1 = require("react");
/*
export function useInstanceOf(instanceClass) {
  const savedArgs = useRef()
  const args = Array.prototype.slice.call(arguments, 1)
  const InstanceFactory = instanceClass.bind.apply(instanceClass, arguments)
  const [ instance, setInstance ] = useState(() => new InstanceFactory())s

  useEffect(() => {
    if (savedArgs.current && !equal(savedArgs.current, args)) {
      // Constructor arguments have change, re-instantiating
      setInstance(new InstanceFactory())
    }
    savedArgs.current = args
  }, [args])

  return instance
}
*/
/*
export function useBinding(instance, propertyName, converter = null) {
  if (!(instance instanceof ViewModel)) {
    const oldInstance = reactRef(instance)
    const [ state, setState ] = reactState(() => ({
      binding: new ReactBinding(instance, propertyName, converter)
    }))

    reactEffect(() => {
      // TODO: THIS NEEDS TO HAPPEN IN COMMAND TOO, BUT NEEDS CHECKING
      let binding = state.binding
      if (instance !== oldInstance.current) {
        oldInstance.current = instance
        binding = new ReactBinding(instance, propertyName, converter)
        setState({ binding: binding })
      }
      return binding.bind(() => setState(state => ({ ...state })))
    }, [instance])

    return state.binding
  } else {
    const bindBinding = instance.useBinding.bind(instance)
    return bindBinding(propertyName, converter)
  }
}
*/
/*
export function useCommand(instance, commandName, converter = null, listener = null) {
  // if (!(instance instanceof ViewModel)) {

    const oldInstance = useRef(instance)
    const [ state, setState ] = useState(() => ({
      binding: new CommandBinding(instance, commandName, converter)
    }))

    useEffect(() => {
      if (instance !== oldInstance.current) {
        oldInstance.current = instance
        setState({
          binding: new CommandBinding(instance, commandName, converter)
        })
      }
      state.binding.bind((...args) => {
        if (typeof listener !== 'function' || listener(...args)) {
          setState(state => ({ ...state }))
        }
      })
      return state.binding.unbind.bind(state.binding)
      // state.binding.bind(() => setState(state => ({ ...state })))
      // return state.binding.unbind.bind(state.binding)
    }, [instance])

    return state.binding
  //} else {
  //  const bindCommand = instance.useCommand.bind(instance)
  //  return bindCommand(commandName, converter)
  //}
}
*/
/*
// TODO: Do I want to allow a converter here
export function useEvent(instance, eventName, listener = null) {
  //if (!(instance instanceof ViewModel)) {

    const oldInstance = useRef(instance)
    const [ state, setState ] = useState(() => ({
      binding: new EventBinding(instance, eventName)
    }))

    useEffect(() => {
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

  //} else {
  //  const bindEvent = instance.useEvent.bind(instance)
  //  return bindEvent(eventName, listener)
  //}
}
*/
// TODO: Converter?
function useExpression(instance, expression) {
    //if (!(instance instanceof ViewModel)) {
    var oldInstance = (0, react_1.useRef)(instance);
    var _a = __read((0, react_1.useState)(function () { return ({
        binding: new ExpressionBinding_1["default"](instance, expression)
    }); }), 2), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
        if (instance !== oldInstance.current) {
            oldInstance.current = instance;
            setState({
                binding: new ExpressionBinding_1["default"](instance, expression)
            });
        }
        return state.binding.bind(function () { return setState(function (state) { return (__assign({}, state)); }); });
    }, [instance]);
    // TODO: iterator generator on the binding
    return state.binding;
    //} else {
    //  throw new Error('Not implemented yet')
    //}
}
exports.useExpression = useExpression;
//# sourceMappingURL=hooks.js.map