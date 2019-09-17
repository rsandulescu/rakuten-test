import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';

const routes: Routes = [
    { path: 'payment', component: PaymentComponent },
    { path: 'payment-successful', component: PaymentSuccessfulComponent },
    { path: '', redirectTo: '/payment', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
