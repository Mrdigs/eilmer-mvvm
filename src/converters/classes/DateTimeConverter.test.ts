import { BindingContext } from "../../bindings";
import DateTimeConverter from "./DateTimeConverter";

// From https://tc39.es/proposal-intl-datetime-style/
const DATE_STYLES = ["full", "long", "medium", "short"] as const;
const TIME_STYLES = ["full", "long", "medium", "short"] as const;

const DATE_TIME_FORMATS = {
  weekday: ["narrow", "short", "long"],
  year: ["2-digit", "numeric"],
  month: ["2-digit", "numeric", "narrow", "short", "long"],
  day: ["2-digit", "numeric"],
  hour: ["2-digit", "numeric"],
  minute: ["2-digit", "numeric"],
  second: ["2-digit", "numeric"],
  timeZoneName: ["short", "long"],
};

describe("DateTimeConverter supports Arabic and other numerical systems", () => {
  const date = new Date("2001-01-01 17:00:00");
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  } as const;
  const context = new BindingContext({}, "");
  Object.assign(options, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const converter = new DateTimeConverter("ar-JO", options);
  const converted = converter.convertFrom(date, context);
  test(`locale:'ar-JO': '${converted}'`, () => {
    const reconverted = converter.convertTo(converted, context);
    expect(converter.convertFrom(date, context)).toBe(
      converter.convertFrom(reconverted, context)
    );
  });
});

describe("DateTimeConverter supports all format options", () => {
  // const date = new Date()
  const date = new Date("2001-01-01 17:00:00");
  const context = new BindingContext({}, "");
  DATE_STYLES.forEach((style) => {
    const options = { dateStyle: style };
    const converter = new DateTimeConverter("de", options);
    const converted = converter.convertFrom(date, context);
    test(`dateStyle:'${style}': '${converted}'`, () => {
      const reconverted = converter.convertTo(converted, context);
      expect(converter.convertFrom(date, context)).toBe(
        converter.convertFrom(reconverted, context)
      );
    });
  });
  TIME_STYLES.forEach((style) => {
    const options = { dateStyle: "long", timeStyle: style } as const;
    const converter = new DateTimeConverter("fr", options);
    const converted = converter.convertFrom(date, context);
    test(`timeStyle:'${style}': '${converted}'`, () => {
      const reconverted = converter.convertTo(converted, context);
      expect(converter.convertFrom(date, context)).toBe(
        converter.convertFrom(reconverted, context)
      );
    });
  });
  Object.entries(DATE_TIME_FORMATS).forEach(([option, values]) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    } as const;
    Object.assign(options, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    values.forEach((value) => {
      options[option] = value;
      const converter = new DateTimeConverter("en", options);
      const converted = converter.convertFrom(date, context);
      test(`${option}:'${value}': '${converted}'`, () => {
        const reconverted = converter.convertTo(converted, context);
        expect(converter.convertFrom(date, context)).toBe(
          converter.convertFrom(reconverted, context)
        );
      });
    });
  });
});
