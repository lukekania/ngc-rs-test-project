import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const TAKEN = new Set(['admin', 'root', 'angular']);

export function uniqueUsernameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ taken: true } | null> => {
    const value = String(control.value ?? '').toLowerCase();
    if (!value) return of(null);
    return timer(400).pipe(
      switchMap(() => of(TAKEN.has(value))),
      map((isTaken) => (isTaken ? { taken: true } : null)),
    );
  };
}
