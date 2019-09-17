import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface FieldErrorsInterface {
    required?: any;
    minLength?: any;
    maxLength?: any;
}

@Component({
    selector: 'app-form-errors-messages',
    styleUrls: ['./form-errors-messages.component.scss'],
    templateUrl: './form-errors-messages.component.html'
})
export class FormErrorsMessagesComponent implements OnChanges, OnDestroy {
    @Input() public field: FormControl;
    @Input() public apiErrorMessage: string;

    public fieldErrors: FieldErrorsInterface;

    private unsubscriber: Subject<void> = new Subject();

    public ngOnChanges(): void {
        // refresh errors on status changes
        this.field.statusChanges.pipe(takeUntil(this.unsubscriber)).subscribe(() => {
            this.fieldErrors = this.field.errors;
        });
    }

    public ngOnDestroy(): void {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }
}
