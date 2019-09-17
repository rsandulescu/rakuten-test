import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { PaymentService } from './services/payment.service';
import { PaymentFormService } from './services/payment-form.service';
import { FormErrorsMessagesComponent } from './form-errors-messages/form-errors-messages.component';

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, HttpClientJsonpModule],
    declarations: [FormErrorsMessagesComponent],
    providers: [PaymentService, PaymentFormService],
    exports: [FormErrorsMessagesComponent]
})
export class SharedModule {}
