import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const message =
        err.status === 0
          ? 'Network unreachable.'
          : `Request failed (${err.status} ${err.statusText || 'error'}).`;
      return throwError(() => Object.assign(new Error(message), { status: err.status }));
    }),
  );
