import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentFormService } from '../shared/services/payment-form.service';

@Component({
    selector: 'app-payment-successful',
    templateUrl: './payment-successful.component.html',
    styleUrls: ['./payment-successful.component.scss']
})
export class PaymentSuccessfulComponent implements OnInit {
    public paymentForm: FormGroup;

    public constructor(private paymentFormService: PaymentFormService, private router: Router) {}

    public ngOnInit(): void {
        // get latest form
        this.paymentForm = this.paymentFormService.getPaymentForm();

        // navigate to first page on page refresh or when the user tries to manually go to this page
        if (!this.paymentForm) {
            this.router.navigate(['/']);
        }
    }
}
