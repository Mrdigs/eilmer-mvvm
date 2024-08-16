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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Bind;
/*
This is the intended replacement for Binding.js. The name is different so that the clash with
the Binding class name goes away, and it's going to work totally differently.

Here is an example of it's usage:

    <Bind $vm={personViewModel} firstName="$vm.firstName">
        <Person />
    </Bind>

This sets the "firstName" property of the <Person> component to personViewModel.firstName, creating a
binding that causes the child component to re-render whenever the value of personViewModel.firstName
is changed.

The nice thing about this is that it allows me to use more than one viewModel in the binding:

<Bind $vm1={aViewModel} $vm2={bViewModel} firstName="$vm1.firstName" somethingElse="$vm2.property"/>

So what about converters?

- Looks at 2-way bindings 1st:

So what about 2-way bindings?

The idea is to have a special function available called @bind()

    <Bind $vm={personViewModel} value="@bind($vm.firstName, 'onChange')">
        <input type="text"/>
    </Bind>

That's quote nice too, BUT what if it uses an expression?

    <Bind $vm={personViewModel} value="@bind($vm.firstName + ' ' + $vm.lastName, 'onChange')">
        <input type="text"/>
    </Bind>

Now, *that* is not possible because onChange would set both firstName *and* lastName to firstName + ' ' + lastName.

So I think @bind has got to enforce 3 parameters of obect, string, string:

    <Bind $vm={personViewModel} firstName="@bind($vm, 'firstName', 'onChange')">
        <input type="text"/>
    </Bind>

Alright, that's good. And a 4th for an optional Converter:

    <Bind $vm={personViewModel} $caseConverter={caseConverter} firstName="@bind($vm, 'firstName', 'onChange', $caseConverter)">
        <input type="text"/>
    </Bind>

That's good too, so what about converters in standard one-way bindings?

    <Bind $vm={personViewModel} $caseConverter={caseConverter} firstName="@convert($vm.firstName, $caseConverter)">
        <input type="text"/>
    </Bind>

That's fine, too. Just be aware that if I wanted to support calls then JSEP supports the ? in firstName?.toUpperCase()

Although I *am* open to the idea of the array solution: firstName={['$vm.firstName', caseConverter]}

What about Commands? The canExecute thing can be handled seperately:

    <Bind $vm={personViewModel} onClick="@command($vm, 'save', $converter)">
        <button>Save</button>
    </Bind>

    Oh but I *do* want to be able to pass additional arguments in here, e.g

    <Bind $vm={personViewModel} onClick="@command($vm, 'doSomething', 'thisAction', $converter)">
        <button>Save</button>
    </Bind>

*/
var bindings_1 = require("../../bindings");
var Expression_1 = __importDefault(require("../../expressions/classes/Expression"));
var ExpressionBinding_1 = __importDefault(require("../../expressions/classes/ExpressionBinding"));
var CommandBinding_1 = __importDefault(require("../../commands/classes/CommandBinding"));
var ObjectVariableResolver_1 = __importDefault(require("../../expressions/classes/ObjectVariableResolver"));
var react_1 = __importStar(require("react"));
/*
type Props = {
  children: JSX.Element; //  | (() => JSX.Element)
};
*/
function Bind(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var boundProps = (0, react_1.useMemo)(function () {
        return propsToBindings(props);
    }, getDependencies(props));
    /*
    const boundProps = {}, expressionContext = {};
    Object.keys(props).sort().forEach((propKey) => {
        const propValue = props[propKey];
        const propType = typeof propValue;
        if (propKey.startsWith("$")) {
          // Props that start with a dollar sign just need to be made available
          // to the expression context so they can be used for evaluation
          expressionContext[propKey] = propValue;
        } else if (propType === "string" && propValue.startsWith("@bind(")) {
          // TODO: Check the result is valid and the whole string is correct
          // TODO: Write some tests for this with various mistakes
          const expression = '[' + propValue.substring(6, propValue.lastIndexOf(')')) + ']'
          const variableResolver = new ObjectVariableResolver(expressionContext)
          const result = new Expression(expression).evaluate(variableResolver)
          // TODO: I need support for a converter, too
          const binding = new Binding(result[0], result[1])
          const handler = binding.setValue.bind(binding)
          const eventHandler = createEventHandler(propKey, handler)
          boundProps[result[2]] = eventHandler
          boundProps[propKey] = binding
        } else if (propType === "string" && propValue.startsWith("@command(")) {
          // Indicates a Command binding
          const expression = '[' + propValue.substring(9, propValue.lastIndexOf(')')) + ']'
          const variableResolver = new ObjectVariableResolver(expressionContext)
          const result = new Expression(expression).evaluate(variableResolver)
          const binding = new CommandBinding(result[0], result[1], result[2])
          const handler = binding.execute.bind(binding)
          const executionHandler = createEventHandler(propKey, handler)
          boundProps[propKey] = executionHandler
        } else if (propType === "string") {
          // This is just a bog standard expression, so create a binding
          boundProps[propKey] = new ExpressionBinding(expressionContext, propValue);
        } else {
          throw new Error("Invalid <Bind> prop: " + propKey);
        }
      });
    */
    return react_1.default.createElement(Bindings, __assign({}, boundProps), children);
}
function Bindings(_a) {
    var children = _a.children, bindings = __rest(_a, ["children"]);
    var _b = __read((0, react_1.useState)(function () { return bindingsToProps(bindings); }), 2), props = _b[0], setProps = _b[1];
    (0, react_1.useEffect)(function () {
        var unbinds = Object.entries(bindings).map(function (_a) {
            var _b = __read(_a, 2), property = _b[0], binding = _b[1];
            return binding.bind(function (value) {
                return setProps(function (props) {
                    var _a;
                    return (__assign(__assign({}, props), (_a = {}, _a[property] = value, _a)));
                });
            });
        });
        return function () { return unbinds.forEach(function (unbind) { return unbind(); }); };
    }, getDependencies(bindings));
    return react_1.default.cloneElement(children, props);
}
function getDependencies(props) {
    return Object.entries(props).reduce(function (a, b) { return a.concat(b); }, []);
}
function propsToBindings(props) {
    var boundProps = {};
    var expressionContext = {};
    Object.keys(props)
        .sort()
        .forEach(function (propKey) {
        var propValue = props[propKey];
        var propType = typeof propValue;
        if (propKey.startsWith("$")) {
            // Props that start with a dollar sign just need to be made available
            // to the expression context so they can be used for evaluation
            expressionContext[propKey] = propValue;
        }
        else if (propType === "string" && propValue.startsWith("@bind(")) {
            // TODO: Check the result is valid and the whole string is correct
            // TODO: Write some tests for this with various mistakes
            var expression = "[" + propValue.substring(6, propValue.lastIndexOf(")")) + "]";
            var variableResolver = new ObjectVariableResolver_1.default(expressionContext);
            var result = new Expression_1.default(expression).evaluate(variableResolver);
            // TODO: I need support for a converter, too
            var binding = new bindings_1.Binding(result[0], result[1]);
            var handler = binding.setValue.bind(binding);
            var eventHandler = createEventHandler(propKey, handler);
            boundProps[result[2]] = eventHandler;
            boundProps[propKey] = binding;
        }
        else if (propType === "string" && propValue.startsWith("@command(")) {
            // Indicates a Command binding
            var expression = "[" + propValue.substring(9, propValue.lastIndexOf(")")) + "]";
            var variableResolver = new ObjectVariableResolver_1.default(expressionContext);
            var result = new Expression_1.default(expression).evaluate(variableResolver);
            var binding = new CommandBinding_1.default(result[0], result[1], result[2]);
            var handler = binding.execute.bind(binding);
            var executionHandler = createEventHandler(propKey, handler);
            boundProps[propKey] = executionHandler;
        }
        else if (propType === "string") {
            // This is just a bog standard expression, so create a binding
            boundProps[propKey] = new ExpressionBinding_1.default(expressionContext, propValue);
        }
        else {
            throw new Error("Invalid <Bind> prop: " + propKey);
        }
    });
    return boundProps;
}
// TODO: Type this properly
function bindingsToProps(bindings) {
    // For the moment, they are all going to be property bindings
    var props = {};
    Object.entries(bindings).forEach(function (_a) {
        var _b = __read(_a, 2), property = _b[0], binding = _b[1];
        if (binding instanceof bindings_1.Binding) {
            props[property] = binding.getValue();
        }
        else {
            props[property] = binding;
        }
    });
    return props;
}
function createEventHandler(eventProperty, handler) {
    return function (eventOrValue) {
        if ((eventOrValue === null || eventOrValue === void 0 ? void 0 : eventOrValue.target) instanceof HTMLElement) {
            handler(eventOrValue.target[eventProperty]);
        }
        else {
            handler(eventOrValue);
        }
    };
}
//# sourceMappingURL=Bind.js.map