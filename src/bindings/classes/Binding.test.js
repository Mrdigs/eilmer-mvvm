import Binding from './Binding'
import Converter from '../../converters/classes/Converter'

describe('Binding tests', () => {
  const viewModel = { name: { firstName: 'John', lastName: 'Doe'}, sex: 'MALE' }
  test('Gets, sets and listens for property changes', () => {
    let notifiedValue
    const binding = new Binding(viewModel.name, 'firstName')
    binding.bind(value => (notifiedValue = value))
    expect(binding.getValue()).toBe('John')
    binding.setValue('Jane')
    expect(binding.getValue()).toBe('Jane')
    expect(notifiedValue).toBe('Jane')
    expect(viewModel.name.firstName).toBe('Jane')
  })
  test('Property paths work as expected', () => {
    const binding = new Binding(viewModel, 'name.firstName')
    expect(binding.getValue()).toBe('Jane')
    binding.setValue('John')
    expect(viewModel.name.firstName).toBe('John')
  })
  test('Converter is applied correctly', () => {
    const converter = new Converter((v) => v.toLowerCase(), (v) => v.toUpperCase())
    const binding = new Binding(viewModel, 'sex', converter)
    expect(binding.getValue()).toBe('male')
    binding.setValue('female')
    expect(viewModel.sex).toBe('FEMALE')
  })
})
