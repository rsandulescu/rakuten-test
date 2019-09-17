import { Country } from '../interfaces/country.interface';

// added them as a constant, should come from an API call
export const COUNTRIES: Array<Country> = [
    { name: 'Germany', code: 'DE', shippingCost: '2,5€' },
    { name: 'Austria', code: 'AT', shippingCost: '3€' },
    { name: 'Spain', code: 'ES', shippingCost: '5,45€' },
    { name: 'France', code: 'FR', shippingCost: '2€' },
    { name: 'Great Britain', code: 'UK', shippingCost: '2,75GBP' }
];
