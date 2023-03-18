

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
    }
}

export default Validator;