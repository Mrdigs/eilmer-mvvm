# Eilmer MVVM

```javascript
import { useInstanceOf, useEvent, Binder } from 'eilmer-mvvm/react'
class PersonModel {
  firstName
  lastName

  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}

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
