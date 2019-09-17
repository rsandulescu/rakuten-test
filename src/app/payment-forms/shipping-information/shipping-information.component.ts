import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Country } from 'src/app/shared/interfaces/country.interface';
import {
    CitiesFormApiErrorInterface,
    PaymentFormApiErrorInterface
} from 'src/app/shared/interfaces/forms-api-error.interface';
import { Subject } from 'rxjs';
import { filter, debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
const MIN_CHAR_LENGTH = 2;

@Component({
    selector: 'app-shipping-information',
    templateUrl: './shipping-information.component.html',
    styleUrls: ['./shipping-information.component.scss']
})
export class ShippingInformationComponent implements OnDestroy, OnInit {
    @Input() paymentForm: FormGroup;
    @Input() citiesForm: FormGroup;

    public countries: Array<Country> = [];
    public cities: Array<string> = [];
    public apiError: PaymentFormApiErrorInterface;
    public citiesApiError: CitiesFormApiErrorInterface;

    private selectedCity: string;
    private unsubscriber: Subject<void> = new Subject();

    public constructor(private paymentService: PaymentService) {}

    public ngOnInit(): void {
        this.searchCitiesServerSide();
        this.getCountries();

        // refresh city and shipping cost fields when country is changed
        // takeUntil not needed on an http call, but it's an observable for now
        this.paymentForm.controls.country.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe(() => {
            this.paymentForm.controls.city.patchValue('');
            this.paymentForm.controls.shippingCost.patchValue('');
        });
    }

    public selectCity(city: string): void {
        // when city is selected, display the shipping cost in its' field
        const selectedCountry: Country = this.countries.find(
            (country: Country) => country.code === this.paymentForm.controls.country.value
        );
        this.paymentForm.controls.shippingCost.patchValue(selectedCountry.shippingCost);

        // display selected city in the input field and close the cities popup
        this.paymentForm.controls.city.patchValue(city);
        this.selectedCity = city;
        this.cities = [];

        // delete all city errors when the correct city is selected
        this.paymentForm.controls.city.setErrors(null);
        this.citiesForm.controls.city.setErrors(null);
    }

    public ngOnDestroy(): void {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }

    private getCountries(): void {
        // get cities (mock) and sort them alphabetically
        // takeUntil not needed on an http call, but it's an observable for now
        this.paymentService
            .getCountries()
            .pipe(takeUntil(this.unsubscriber))
            .subscribe(
                (countries: Country[]) =>
                    (this.countries = countries.sort((a: Country, b: Country) => (a.name > b.name ? 1 : -1)))
            );
    }

    private searchCitiesServerSide(): void {
        // handle the typeahead endpoint
        this.paymentForm.controls.city.valueChanges
            .pipe(
                takeUntil(this.unsubscriber),
                tap((term: string) => (this.cities = term.length > MIN_CHAR_LENGTH ? this.cities : [])),
                debounceTime(500),
                filter(
                    (term: string) =>
                        term.length > MIN_CHAR_LENGTH &&
                        this.selectedCity !== term &&
                        this.paymentForm.controls.country.value
                ),
                switchMap((term: string) =>
                    this.paymentService.typeAheadCities(this.paymentForm.controls.country.value, term)
                )
            )
            .subscribe(
                (cities: Array<string>) => {
                    this.cities = cities.filter((city: string) => city.length);

                    // handle errors popups
                    setTimeout(() => {
                        this.citiesForm.controls.city.setErrors(this.cities.length ? { cityNotSelected: true } : null);
                        this.paymentForm.controls.city.setErrors(!this.cities.length ? { cityNotValid: true } : null);
                    });
                },
                error => {
                    // handle error in a different way, but leave it for now
                    console.log(error);
                    this.cities = [];
                }
            );
    }
}
