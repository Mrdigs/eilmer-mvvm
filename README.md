![eilmer-original](https://user-images.githubusercontent.com/3416486/169643721-56b09632-9733-41a5-b220-8ea2a0985e30.svg)
# Eilmer MVVM

Eilmer is a toolkit for building MVVM applications and frameworks, specifically targeted for (but not limited to) **React**.

| :warning: | Eilmer is currently in active development, is not yet even alpha quality, and is currently unlicenced. The initial licenced release is expected in the coming weeks and months.
| - |:-|

Test commit 

## Example Code
The following code gives a good overview of the capabilities of Eilmer. Full documentation will be provided on release.

### The Model
```javascript
class PersonModel {
  firstName
  lastName

  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  hasName(firstName, lastName) {
    return firstName === this.firstName && lastName === this.lastName
  }

  async setName(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
    // await some REST API call, etc
  }
}
```
### The View Model
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
    this.save.canExecute = (
      !this.#personModel.hasName(this.firstName, this.lastName)
      && this.firstName && this.lastName
    )
  }

  onSaved() {
    this.save.canExecute = false
  }

  async save() {
    this.#personModel.setName(this.firstName, this.lastName)
    this.onSaved()
  }
}
```
### The View
```javascript
import { Binder, useEvent } from 'eilmer/react'
import { notConverter } from 'eilmer/converters'

const personModel = new PersonModel('', '')
const personViewModel = new PersonViewModel(personModel)

function PersonView({ viewModel = personViewModel }) {
  useEvent(viewModel, 'onSaved', () => {
    alert('Successfully saved!')
    return true
  })

  return <>
    <div>
      Model Value: {JSON.stringify(personModel)}
    </div>
    <Binder.Binding vm={viewModel} value="firstName">
      <input/>
    </Binder.Binding>
    <Binder.Binding vm={viewModel} value="lastName">
      <input/>
    </Binder.Binding>
    <Binder.Binding vm={viewModel} command="save" disabled={['save.canExecute', notConverter]}>
      <button>Save</button>
    </Binder.Binding>
  </>
}
```
![react+eilmer](https://user-images.githubusercontent.com/3416486/169643780-e3110ace-221b-4047-a530-43ef6286c961.svg)
