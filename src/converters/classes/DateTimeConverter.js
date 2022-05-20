import Converter from './Converter'
import ConverterException from './ConverterException'

const PARTS_MAPPING = {
  literal: {
    default: ['({0})', null, null]
  },
  year: {
    numeric: ['([0-9][0-9][0-9][0-9])', Number, Date.prototype.setFullYear],
    '2-digit': ['([0-9][0-9])', Number, Date.prototype.setYear]
  },
  month: {
    long: ['(.*)', (v, months) => (months.indexOf(v)), Date.prototype.setMonth],
    short: ['(.*)\\.?', (v, months) => (months.indexOf(v)), Date.prototype.setMonth],
    narrow: ['(.)', (v, months) => (months.indexOf(v)), Date.prototype.setMonth],
    numeric: ['([0-9]?[0-9])', (v) => (Number(v) - 1), Date.prototype.setMonth],
    '2-digit': ['([0-9][0-9])', (v) => (Number(v) - 1), Date.prototype.setMonth]
  },
  day: {
    numeric: ['([0-9]?[0-9])', Number, Date.prototype.setDate],
    '2-digit': ['([0-9][0-9])', Number, Date.prototype.setDate]
  },
  weekday: {
    long: ['(.*)', null, null],
    short: ['(.*)', null, null],
    narrow: ['(.)', null, null]
  },
  hour: {
    numeric: ['([0-9]?[0-9])', Number, Date.prototype.setHours],
    '2-digit': ['([0-9][0-9])', Number, Date.prototype.setHours]
  },
  minute: {
    numeric: ['([0-9]?[0-9])', Number, Date.prototype.setMinutes],
    '2-digit': ['([0-9][0-9])', Number, Date.prototype.setMinutes]
  },
  second: {
    numeric: ['([0-9]?[0-9])', Number, Date.prototype.setSeconds],
    '2-digit': ['([0-9][0-9])', Number, Date.prototype.setSeconds]
  },
  timeZoneName: {
    long: ['(.*)', null, null],
    short: ['(.*)', null, null]
  },
  dayPeriod: {
    default: ['([^ ]*)', null, null]
  }
}

const DATE_STYLES = {
  full: {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  },
  long: {
    year: 'numeric', month: 'long', day: 'numeric'
  },
  medium: {
    year: 'numeric', month: '2-digit', day: '2-digit'
  },
  short: {
    year: '2-digit', month: '2-digit', day: '2-digit'
  }
}

const TIME_STYLES = {
  full: {
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'long'
  },
  long: {
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
  },
  medium: {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  },
  short: {
    hour: '2-digit', minute: '2-digit'
  }
}

class DateTimeConverter extends Converter {

  #formatter
  #formatParts
  #formatOptions
  #formatMonthNames
  #formatDayPeriods

  constructor(locale, options) {
    if (options?.timeZone) {
      throw new Error('Timezones are not supported in DateTimeConverter')
    } else {
      super()
      this.#formatter = new Intl.DateTimeFormat(locale, options)
      this.#formatOptions = this.#formatter.resolvedOptions()
      if (DATE_STYLES[options?.dateStyle]) {
        Object.assign(this.#formatOptions, DATE_STYLES[options.dateStyle])
      }
      if (TIME_STYLES[options?.timeStyle]) {
        Object.assign(this.#formatOptions, TIME_STYLES[options.timeStyle])
      }
      if (this.#formatOptions.numberingSystem !== 'latn') {
        this.#formatOptions.numbers = getNumbersForLocale(this.#formatOptions.locale)
      }
      this.#formatParts = this.#formatter.formatToParts(new Date('2001-01-01')).map(part => {
        const mapping = PARTS_MAPPING[part.type]
        if (mapping) {
          const format = this.#formatOptions[part.type] || 'default'
          part.value = formatString(this.#formatOptions, mapping[format][0], part.value)
          return part
        } else {
          throw new Error('No mapping available for ' + part.type)
        }
      })
      this.#formatMonthNames = []
      if (['long','short','narrow'].includes(this.#formatOptions['month'])) {
        const format = this.#formatOptions['month']
        const formatter = new Intl.DateTimeFormat(locale, {month:format})
        for (var month = 0; month < 12; month++) {
          this.#formatMonthNames.push(formatter.format(new Date(2022, month, 1)))
        }
      }
      if (this.#formatOptions['hour12']) {
        const am = this.#formatter.formatToParts(new Date('2001-01-01 06:00:00')).find(part => {
          return part.type === 'dayPeriod'
        })
        const pm = this.#formatter.formatToParts(new Date('2001-01-01 18:00:00')).find(part => {
          return part.type === 'dayPeriod'
        })
        this.#formatDayPeriods = {
          am: am.value, pm: pm.value
        }
      }
    }
  }

  convertFrom(viewModelValue, bindingContext) {
    try {
      return this.#formatter.format(viewModelValue)
    } catch (err) {
      throw new ConverterException(err.message)
    }
  }

  convertTo(viewValue, bindingContext) {
    const date = new Date(2022, 0, 1, 0, 0, 0)
    try {
      const regex = new RegExp('^' + this.#formatParts.map(({ type, value }) => value).join('') + '$')
      const parsed = regex.exec(viewValue).slice(1, this.#formatParts.length + 1)
      if (parsed.length === this.#formatParts.length) {
        let dayPeriodAdjustment = 0
        this.#formatParts.forEach((part, idx) => {
          const mapping = PARTS_MAPPING[part.type]
          if (mapping) {
            const format = this.#formatOptions[part.type] || 'default'
            if (part.type !== 'dayPeriod') {
              if (mapping[format] && mapping[format][2]) {
                const setFunction = mapping[format][2].bind(date)
                const value = parseValue(this.#formatOptions, format, parsed[idx])
                const setValue = mapping[format][1](value, this.#formatMonthNames)
                setFunction(setValue)
              }
            } else if (this.#formatDayPeriods.pm === parsed[idx]) {
              dayPeriodAdjustment = 12
            }
          }
        })
        date.setHours(date.getHours() + dayPeriodAdjustment)
      }
    } catch (err) {
      throw new ConverterException(err.message)
    }
    if (this.#formatter.format(date) !== viewValue) {
      throw new ConverterException('Cannot parse date "' + viewValue + '"')
    }
    if (this.#formatOptions['year'] === 'short') {
      console.warn('DateTimeConverter: Using "short" year format option is not advised for 2-way bindings')
    }
    return date
  }

}

class IsoDateConverter extends Converter {

  includeTime = false

  constructor(includeTime) {
    super()
    this.includeTime = includeTime
  }

  convertFrom(viewModelValue, bindingContext) {
    if (viewModelValue) {
      const string = viewModelValue.toISOString()
      return this.includeTime ? string : string.slice(0, 10)
    } else {
      return viewModelValue
    }
  }

  convertTo(viewValue, bindingContext) {
    const date = new Date(viewValue)
    if (date.toString() === 'Invalid Date') {
      throw new ConverterException('Cannot parse date', context.propertyName, viewValue)
    }
    return date
  }

}

function getNumbersForLocale(locale) {
  const formatter = new Intl.NumberFormat(locale, {useGrouping: false})
  return [...formatter.format(9876543210)].reverse()
}

function parseValue(options, type, value) {
  if (options.numbers && ['numeric', '2-digit'].includes(type)) {
    const parsed = new Array(value.length)
    for (var i = 0; i < value.length; i++) {
      parsed.push(options.numbers.indexOf(value[i]))
    }
    return parsed.join('')
  }
  return value
}

function formatString(options, string, ...args) {
  let formatted = string
  for (let arg in args) {
    let value = args[arg].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    formatted = formatted.replace("{" + arg + "}", value)
  }
  if (options.numbers && formatted.includes('[0-9]')) {
    const replacement = `[${options.numbers.join('')}]`
    formatted = formatted.replace(/\[0-9\]/g, replacement)
  }
  return formatted
}

DateTimeConverter.isoDateConverter = new IsoDateConverter(false)
DateTimeConverter.isoDateTimeConverter = new IsoDateConverter(true)

export default DateTimeConverter
