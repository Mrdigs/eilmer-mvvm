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
import { Binding } from "../../bindings"
import { CommandBinding } from "../../commands"
import Expression from "../../expressions/classes/Expression"
import ExpressionBinding from "../../expressions/classes/ExpressionBinding"
import ObjectVariableResolver from "../../expressions/classes/ObjectVariableResolver"
import React, { useEffect, useMemo, useState } from "react"

type BindProps = React.PropsWithChildren<{ [key: string]: any }>

export default function Bind({ children, ...props }: BindProps) {
  const boundProps = useMemo(() => {
    return propsToBindings(props)
  }, getDependencies(props))

  return <Bindings {...boundProps}>{children}</Bindings>
}

function Bindings({ children, ...bindings }: BindProps) {
  const [props, setProps] = useState(() => bindingsToProps(bindings))

  useEffect(() => {
    const unbinds = Object.entries(bindings).map(([property, binding]) => {
      return binding.bind((value) =>
        setProps((props) => ({ ...props, [property]: value }))
      )
    })
    return () => unbinds.forEach((unbind) => unbind())
  }, getDependencies(bindings))

  return React.cloneElement(children as React.ReactElement, props)
}

function getDependencies(props: { [key: string]: any }) {
  return Object.entries(props).reduce((a, b) => a.concat(b), [])
}

function propsToBindings(props: { [key: string]: any }) {
  const propKeys = Object.keys(props)
  const boundProps: { [key: string]: any } = {}
  const expressionContext = {}

  propKeys.forEach((propKey) => {
    const propValue = props[propKey]

    // Props that start with a dollar sign just need to be made available
    // to the expression context so they can be used for evaluation
    if (propKey.startsWith("$")) {
      expressionContext[propKey] = propValue
      return
    }

    if (typeof propValue !== "string") {
      throw new Error("Invalid <Bind> prop: " + propKey)
    }

    const endParens = propValue.lastIndexOf(")")

    // Indicates a Property binding
    if (propValue.startsWith("@bind(")) {
      // TODO: Check the result is valid and the whole string is correct
      // TODO: Write some tests for this with various mistakes
      if (endParens == -1) {
        throw new Error("@bind must have closing parenthesis")
      }
      const expr = "[" + propValue.substring(6, endParens) + "]"
      const variableResolver = new ObjectVariableResolver(expressionContext)
      const expression = new Expression(expr)
      const result = expression.evaluate(variableResolver) as any[]
      const binding = new Binding(result[0], result[1])
      const handler = binding.setValue.bind(binding)
      // TODO, actually check *all* of the results and throw an error
      // if they are not the expected types....
      if (result.length > 2 && typeof result[2] === "string") {
        boundProps[result[2]] = createEventHandler(propKey, handler)
      }
      boundProps[propKey] = binding
      return
    }

    // Indicates a Command binding
    if (propValue.startsWith("@command(")) {
      // TODO: Check the result is valid and the whole string is correct
      // TODO: Write some tests for this with various mistakes
      if (endParens == -1) {
        throw new Error("@command needs closing parenthesis")
      }
      const expr = "[" + propValue.substring(9, endParens) + "]"
      const variableResolver = new ObjectVariableResolver(expressionContext)
      const expression = new Expression(expr)
      const result = expression.evaluate(variableResolver) as any[]
      const binding = new CommandBinding(result[0], result[1])
      const handler = binding.execute.bind(binding, result.slice(2))
      boundProps[propKey] = createEventHandler(propKey, handler)
      return
    }

    // This is just a bog standard expression, so create a binding
    boundProps[propKey] = new ExpressionBinding(expressionContext, propValue)
    return
  })

  return boundProps
}

function bindingsToProps(bindings: { [key: string]: any }) {
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

function createEventHandler(eventProperty: string, handler: (v: any) => void) {
  return (eventOrValue: any) => {
    if (eventOrValue?.target instanceof HTMLElement) {
      handler(eventOrValue.target[eventProperty])
    } else {
      handler(eventOrValue)
    }
  }
}
