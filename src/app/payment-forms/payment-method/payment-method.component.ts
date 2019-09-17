import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaymentFormApiErrorInterface } from 'src/app/shared/interfaces/forms-api-error.interface';

@Component({
    selector: 'app-payment-method',
    templateUrl: './payment-method.component.html',
    styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent {
    @Input() paymentForm: FormGroup;
    public apiError: PaymentFormApiErrorInterface;
}
