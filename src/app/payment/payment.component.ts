import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentFormService } from '../shared/services/payment-form.service';
import { PaymentFormApiErrorInterface } from '../shared/interfaces/forms-api-error.interface';
import { FormUtils } from '../shared/utils/form-utlis';
import { PaymentService } from '../shared/services/payment.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    public paymentForm: FormGroup;
    public citiesForm: FormGroup;
    public pending: boolean;
    public apiError: PaymentFormApiErrorInterface;

    private unsubscriber: Subject<void> = new Subject();

    public constructor(
        private paymentFormService: PaymentFormService,
        private paymentService: PaymentService,
        private router: Router
    ) {}

    public ngOnInit(): void {
        // initiate forms
        this.paymentForm = this.paymentFormService.initPaymentForm();
        this.citiesForm = this.paymentFormService.initCitiesForm();
    }

    public sendForm(): void {
        // show errors if there are any
        FormUtils.exposeFormErrors(this.paymentForm);
        FormUtils.exposeFormErrors(this.citiesForm);

        // do not submit if any forms are invalid
        if (this.paymentForm.invalid || this.citiesForm.invalid) {
            return;
        }

        // simulate an API post call
        // takeUntil not needed for http call, but it's an observable for now
        this.pending = true;
        this.paymentService
            .postForm(this.paymentForm)
            .pipe(takeUntil(this.unsubscriber))
            .subscribe(() => {
                this.pending = false;
                this.router.navigate(['/payment-successful']);
            });
    }

    public ngOnDestroy(): void {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }
}
