import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(forbidden: readonly string[]): ValidatorFn {
  const set = new Set(forbidden.map((s) => s.toLowerCase()));
  return (control: AbstractControl) => {
    const value = String(control.value ?? '').toLowerCase();
    return value && set.has(value) ? { forbidden: { value } } : null;
  };
}
