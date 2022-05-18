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

  constructor(locale, options) {
    if (options.timeZone) {
      throw new Error('Timezones are not supported in DateTimeConverter')
    } else {
      super()
      this.#formatter = new Intl.DateTimeFormat(locale, options)
      this.#formatOptions = this.#formatter.resolvedOptions()
      if (DATE_STYLES[options.dateStyle]) {
        Object.assign(this.#formatOptions, DATE_STYLES[options.dateStyle])
      }
      if (TIME_STYLES[options.timeStyle]) {
        Object.assign(this.#formatOptions, TIME_STYLES[options.timeStyle])
      }
      this.#formatParts = this.#formatter.formatToParts(new Date('2001-01-01')).map(part => {
        const mapping = PARTS_MAPPING[part.type]
        if (mapping) {
          const format = this.#formatOptions[part.type] || 'default'
          part.value = formatString(mapping[format][0], part.value)
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
        this.#formatParts.forEach((part, idx) => {
          const mapping = PARTS_MAPPING[part.type]
          if (mapping) {
            const format = this.#formatOptions[part.type] || 'default'
            if (mapping[format] && mapping[format][2]) {
              const setFunction = mapping[format][2].bind(date)
              const setValue = mapping[format][1](parsed[idx], this.#formatMonthNames)
              setFunction(setValue)
            }
          }
        })
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

DateTimeConverter.isoDateConverter = new DateTimeConverter('en-CA', { dateStyle: 'short' })

function formatString(string, ...args) {
  let formatted = string
  for (let arg in args) {
    let value = args[arg].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    formatted = formatted.replace("{" + arg + "}", value)
  }
  return formatted
}

export default DateTimeConverter
