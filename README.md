![eilmer-github](https://user-images.githubusercontent.com/3416486/169549391-252a8846-7be9-4d27-9d60-70b250b28b2f.png)
# Eilmer MVVM

### The Model

Our Model represents a person who can have a first and last name. The text fields in the View will be initialized with these values, and the Model will be updated to reflect their changes when they press the "save" button.

```javascript
class PersonModel {
  firstName
  lastName

  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```
### The ViewModel

The ViewModel represents the state of the View. It is initialized with a PersonModel and has three main features: a firstName and lastName property that initially come from the Model and which are to be updated by the user via text boxes, a "save" command (which is a function) to propagate the changes back to the Model when the user presses the "save" button, and an "onSaved" event (which is also a function) that allows the ViewModel to communicate that the the user's changes were successfully saved.

There are several ways this ViewModel could have been written, but I have chosen to keep it free of any Eilmer classes to demonstrate how any plain old object can be used as a ViewModel.

```javascript
class PersonViewModel {
  #personModel
  firstName
  lastName

  constructor(personModel) {
    this.#personModel = personModel
    this.firstName = this.#personModel.firstName
    this.lastName = this.#personModel.lastName
    this.save.canExecute = false
  }

  onPropertyChange() {
    this.save.canExecute = this.firstName && this.lastName
  }

  onSaved() {
    this.save.canExecute = false
  }

  save() {
    this.#personModel.firstName = this.firstName
    this.#personModel.lastName = this.lastName
    this.onSaved()
  }
}
```
### The View

The View represents the UI, which is free of any logic and simply hooks into the ViewModel to allow it to be used to manage the View's state.

Again, this could have been written in several different ways, but I chose the most concise and performant solution as a demonstration.

```javascript
import { useInstanceOf, useEvent, Binder } from 'eilmer-mvvm/react'

function PersonView({ firstName = 'John', lastName = 'Doe' }) {
  const personModel = useInstanceOf(PersonModel, firstName, lastName)
  const personViewModel = useInstanceOf(PersonViewModel, personModel)
  useEvent(personViewModel, 'onSaved')

  return (
    <div>
      <div>Model Value: {JSON.stringify(personModel)}</div>
      <Binder vm={personViewModel}>
        <Binder.Binding value="firstName">
          <input/>
        </Binder.Binding>
        <Binder.Binding value="lastName">
          <input/>
        </Binder.Binding>
        <Binder.Binding command="save" canExecute="!disabled">
          <button>Save</button>
        </Binder.Binding>
      </Binder>
    </div>
  )
}
```
