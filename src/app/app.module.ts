import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { PersonalInformationComponent } from './payment-forms/personal-information/personal-information.component';
import { ShippingInformationComponent } from './payment-forms/shipping-information/shipping-information.component';
import { PaymentMethodComponent } from './payment-forms/payment-method/payment-method.component';
import { PaymentComponent } from './payment/payment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule, SharedModule],
    declarations: [
        AppComponent,
        PaymentComponent,
        PaymentSuccessfulComponent,
        PageNotFoundComponent,
        PersonalInformationComponent,
        ShippingInformationComponent,
        PaymentMethodComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
