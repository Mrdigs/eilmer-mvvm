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

    <Bind $vm={personViewModel} firstName="@bind($vm.firstName, 'onChange')">
        <input type="text"/>
    </Bind>

That's quote nice too, BUT what if it uses an expression?

    <Bind $vm={personViewModel} firstName="@bind($vm.firstName + ' ' + $vm.lastName, 'onChange')">
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
// import React = require("react");
import { Binding } from "../../bindings";
import Expression from "../../expressions/classes/Expression";
import ExpressionBinding from "../../expressions/classes/ExpressionBinding";
import CommandBinding from "../../commands/classes/CommandBinding";
import ObjectVariableResolver from "../../expressions/classes/ObjectVariableResolver";
import React, { useEffect, useMemo, useState } from "react";

/*
type Props = {
  children: JSX.Element; //  | (() => JSX.Element)
};
*/

export default function Bind({ children, ...props }) {
  const boundProps = useMemo(() => {
    return propsToBindings(props)
  }, getDependencies(props))

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

  return (
    <Bindings {...boundProps}>
      {children}
    </Bindings>
  )
}

function Bindings({children, ...bindings}) {
  const [props, setProps] = useState(() => bindingsToProps(bindings))

  useEffect(() => {
    const unbinds = Object.entries(bindings).map(([property, binding]) => {
      return binding.bind(value => setProps(props => ({ ...props, [property]: value})))
    })
    return () => unbinds.forEach(unbind => unbind())
  }, getDependencies(bindings));

  return React.cloneElement(children, props)

}

function getDependencies(props) {
  return Object.entries(props).reduce((a, b) => a.concat(b), [])
}

function propsToBindings(props) {
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
  return boundProps
}

// TODO: Type this properly
function bindingsToProps(bindings) {
  // For the moment, they are all going to be property bindings
  const props = {}
  Object.entries(bindings).forEach(([property, binding]) => {
    if (binding instanceof Binding) {
      props[property] = binding.getValue()
    } else {
      props[property] = binding
    }
  })
  return props
}

function createEventHandler(eventProperty, handler) {
  return (eventOrValue) => {
    if (eventOrValue?.target instanceof HTMLElement) {
      handler(eventOrValue.target[eventProperty])
    } else {
      handler(eventOrValue)
    }
  }
}