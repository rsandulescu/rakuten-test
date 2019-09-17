export interface PaymentFormApiErrorInterface {
    firstName: { message: string };
    lastName: { message: string };
    address: { message: string };
    country: { message: string };
    city: { message: string };
    cardName: { message: string };
    cardNumber: { message: string };
    cvv: { message: string };
    termsAndConditions: { message: string };
}

export interface CitiesFormApiErrorInterface {
    city: { message: string };
}
