

export type CurrencyTypes = 'INR' | 'USD' | 'EUR';

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
    }
}

export default Validator;