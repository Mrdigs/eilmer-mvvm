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

describe('DateTimeConverter supports all format options', () => {
  const date = new Date()
  DATE_STYLES.forEach((style) => {
    test(`dateStyle:'${style}'`, () => {
      const options = { dateStyle: style }
      const converter = new DateTimeConverter('de', options)
      const converted = converter.convertTo(converter.convertFrom(date))
      expect(converter.convertFrom(date)).toBe(converter.convertFrom(converted))
    })
  })
  TIME_STYLES.forEach((style) => {
    test(`timeStyle:'${style}'`, () => {
      const options = { dateStyle: 'long', timeStyle: style }
      const converter = new DateTimeConverter('fr', options)
      const converted = converter.convertTo(converter.convertFrom(date))
      expect(converter.convertFrom(date)).toBe(converter.convertFrom(converted))
    })
  })
  Object.entries(DATE_TIME_FORMATS).forEach(([option, values]) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    Object.assign(options, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    values.forEach((value) => {
      test(`${option}:'${value}'`, () => {
        options[option] = value
        const converter = new DateTimeConverter('fr', options)
        const converted = converter.convertTo(converter.convertFrom(date))
        expect(converter.convertFrom(date)).toBe(converter.convertFrom(converted))
      })
    })
  })
})
