import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class PaymentFormService {
    private paymentForm: FormGroup;
    private citiesForm: FormGroup;

    public constructor(private fb: FormBuilder) {}

    public initPaymentForm(): FormGroup {
        this.paymentForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
            address: ['', Validators.required],
            country: ['', Validators.required],
            city: ['', [Validators.required, Validators.minLength(3)]],
            shippingCost: [{ value: '', disabled: true }, Validators.required],
            cardName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
            cardNumber: [
                '',
                [Validators.required, Validators.minLength(13), Validators.maxLength(16), Validators.pattern('[0-9]*')]
            ],
            cvv: [
                '',
                [Validators.required, Validators.minLength(3), Validators.maxLength(4), Validators.pattern('[0-9]*')]
            ],
            termsAndConditions: [false, [Validators.requiredTrue]]
        });

        return this.paymentForm;
    }

    public initCitiesForm(): FormGroup {
        this.citiesForm = this.fb.group({
            city: ['']
        });

        return this.citiesForm;
    }

    public getPaymentForm(): FormGroup {
        return this.paymentForm;
    }
}
