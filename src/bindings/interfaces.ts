interface IBindingContext {
  readonly viewModel: object

  readonly propertyName: string

  setAttribute(key: any, value: any): void

  getAttribute<T>(key: any, defaultValue?: T): T
}
