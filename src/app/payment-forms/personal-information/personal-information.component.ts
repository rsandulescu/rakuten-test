import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaymentFormApiErrorInterface } from 'src/app/shared/interfaces/forms-api-error.interface';

@Component({
    selector: 'app-personal-information',
    templateUrl: './personal-information.component.html',
    styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent {
    @Input() paymentForm: FormGroup;
    public apiError: PaymentFormApiErrorInterface;
}
