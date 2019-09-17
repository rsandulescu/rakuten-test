import { FormGroup } from '@angular/forms';

export abstract class FormUtils {
    public static exposeFormErrors(form: FormGroup): void {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormGroup) {
                // Manage Sub forms
                FormUtils.exposeFormErrors(control);
            } else {
                control.markAsTouched({ onlySelf: true });
                control.markAsDirty({ onlySelf: true });
                if (control.errors && control.errors.required === true) {
                    control.updateValueAndValidity({ onlySelf: true });
                }
            }
        });
    }
}
