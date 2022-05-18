import DateTimeConverter from './DateTimeConverter'

// From https://tc39.es/proposal-intl-datetime-style/
const DATE_STYLES = ["full", "long", "medium", "short"]
const TIME_STYLES = ["full", "long", "medium", "short"]

const DATE_TIME_FORMATS = {
  weekday: ["narrow", "short", "long"],
  year: ["2-digit", "numeric"],
  month: ["2-digit", "numeric", "narrow", "short", "long"],
  day: ["2-digit", "numeric"],
  hour: ["2-digit", "numeric"],
  minute: ["2-digit", "numeric"],
  second: ["2-digit", "numeric"],
  timeZoneName: ["short", "long"]
}

test('DateTimeConverter correctly converts dates', () => {
  const date = new Date()
  DATE_STYLES.forEach((style) => {
    const options = { dateStyle: style }
    const converter = new DateTimeConverter('de', options)
    const converted = converter.convertTo(converter.convertFrom(date))
    expect(converter.convertFrom(date)).toBe(converter.convertFrom(converted))
  })
  TIME_STYLES.forEach((style) => {
    const options = { dateStyle: 'long', timeStyle: style }
    const converter = new DateTimeConverter('fr', options)
    const converted = converter.convertTo(converter.convertFrom(date))
    expect(converter.convertFrom(date)).toBe(converter.convertFrom(converted))
  })
  Object.entries(DATE_TIME_FORMATS).forEach(([option, values]) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    Object.assign(options, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    values.forEach((value) => {
      options[option] = value
      const converter = new DateTimeConverter('fr', options)
      const converted = converter.convertTo(converter.convertFrom(date))
      expect(converter.convertFrom(date)).toBe(converter.convertFrom(converted))
    })
  })
})
