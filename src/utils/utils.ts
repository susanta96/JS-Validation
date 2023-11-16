import { Temporal } from "@js-temporal/polyfill";
// import { intlFormat } from "date-fns";

export type CurrencyTypes = "INR" | "USD" | "EUR";
export type UnitTypes =
  | "kilometer-per-hour"
  | "meter-per-second"
  | "kilometer"
  | "meter"
  | "foot";

const Validator = {
  /**
   * @title Formating any number to Currency Style
   * @author Susanta Chakraborty
   */
  formatCurrency(
    number: number,
    locale: string,
    currency: CurrencyTypes,
    fractionRequired?: boolean
  ) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      signDisplay: "auto", // Sign to show, auto is default
      // maximumSignificantDigits: 3, // Put if you want to round of some value, otherwise don't put
      currency,
      maximumFractionDigits: fractionRequired ? 2 : 0, // Remove the Fraction
    }).format(number);
  },
  /**
   * @author Susanta Chakraborty
   * @param distance is the bumber format , also expect it to be in Meter
   * @param locale should be string (navigator.language)
   * @returns string with passed units
   */
  formatDistance(distance: number, locale: string, unit: UnitTypes) {
    return new Intl.NumberFormat(locale, {
      style: "unit",
      unit,
      unitDisplay: "short",
    }).format(distance);
  },

  /**
   * @author Susanta Chakraborty
   * @param number is the bumber format , also expect it to be in Meter
   * @param locale should be string (navigator.language)
   * @returns B, M , K - Short form of Million Billion etc
   */
  formatCompactNumber(number: number, locale: string) {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
    }).format(number);
  },

  /// Date Formatting

  /**
   * Convert a date to a relative time string, such as
   * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
   * using Intl.RelativeTimeFormat
   * @author Susanta Chakraborty
   *
   */
  getRelativeTimeString(
    date: Date | number,
    lang = navigator.language
  ): string {
    // Allow dates or times to be passed
    const timeMs = typeof date === "number" ? date : date.getTime();

    // Get the amount of seconds between the given date and now
    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

    // Array reprsenting one minute, hour, day, week, month, etc in seconds
    const cutoffs = [
      60,
      3600,
      86400,
      86400 * 7,
      86400 * 30,
      86400 * 365,
      Infinity,
    ];

    // Array equivalent to the above but in the string representation of the units
    const units: Intl.RelativeTimeFormatUnit[] = [
      "second",
      "minute",
      "hour",
      "day",
      "week",
      "month",
      "year",
    ];

    // Grab the ideal cutoff unit
    const unitIndex = cutoffs.findIndex(
      (cutoff) => cutoff > Math.abs(deltaSeconds)
    );

    // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
    // is one day in seconds, so we can divide our seconds by this to get the # of days
    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

    // Intl.RelativeTimeFormat do its magic
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
  },

  formatTime(date: string): string {
    const year = Number(date.split("-")[0]);
    const month = Number(date.split("-")[1]);
    const day = Number(date.split("T")[0].split("-")[2]);
    const hour = Number(date.split("T")[1].split(":")[0]);
    const min = Number(date.split("T")[1].split(":")[1]);

    const tempDate = Temporal.ZonedDateTime.from({
      timeZone: "Europe/Berlin",
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: min,
    });
    const formatIntl = Intl.DateTimeFormat(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(tempDate.toInstant().epochMilliseconds);

    return formatIntl;
  },

  formatTimeNew(timestamp: string) {
    // Get the date and time from the input, ignoring the +0000 offset.
    // The timestamp actually refers to a local date/time in CET and the +0000 is fake.
    const pdt = Temporal.PlainDateTime.from(timestamp);

    // Project this timezone-less date/time into CET
    const zdtCET = pdt.toZonedDateTime("Europe/Berlin");

    // Convert to the user's local time zone
    const zdtLocal = zdtCET.withTimeZone(Temporal.Now.timeZoneId());

    // Finally, format its hours/minutes in 24-hour time display
    return zdtLocal.toLocaleString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  },
};

export default Validator;
