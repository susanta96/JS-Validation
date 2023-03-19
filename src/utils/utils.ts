

export type CurrencyTypes = 'INR' | 'USD' | 'EUR';
export type UnitTypes = "kilometer-per-hour" | "meter-per-second" | "kilometer" | "meter" | "foot";

const Validator = {
    /**
     * @title Formating any number to Currency Style
     * @author Susanta Chakraborty
     */
    formatCurrency(number: number, locale: string, currency: CurrencyTypes, fractionRequired?: boolean) {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            signDisplay: 'auto', // Sign to show, auto is default 
            // maximumSignificantDigits: 3, // Put if you want to round of some value, otherwise don't put
            currency,
            maximumFractionDigits: fractionRequired ? 2 : 0 // Remove the Fraction
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
            style: 'unit',
            unit,
            unitDisplay: 'short'
          }).format(distance);
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
    const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
  
    // Array equivalent to the above but in the string representation of the units
    const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];
  
    // Grab the ideal cutoff unit
    const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));
  
    // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
    // is one day in seconds, so we can divide our seconds by this to get the # of days
    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;
  
    // Intl.RelativeTimeFormat do its magic
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
  },
}

export default Validator;