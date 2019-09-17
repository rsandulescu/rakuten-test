import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Country } from '../interfaces/country.interface';
import { CITIES_URL } from '../constants/app.constants';
import { COUNTRIES } from '../constants/countries.constants';
import { Observable, timer, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    constructor(private http: HttpClient) {}

    public typeAheadCities(country: string, q: string): Observable<Array<string>> {
        return this.http.get(`${CITIES_URL}&filter=${country}&q=${q}`).pipe(
            map((response: Array<string>) => {
                return response;
            })
        );
    }

    // simulate a get call
    public getCountries(): Observable<Country[]> {
        return of(COUNTRIES);
    }

    // simulate a post call
    public postForm(form: FormGroup): Observable<number> {
        return timer(1500);
    }
}
