import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = performance.now();
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        const ms = (performance.now() - started).toFixed(0);
        console.debug(`[http] ${req.method} ${req.urlWithParams} → ${event.status} (${ms}ms)`);
      }
    }),
  );
};
