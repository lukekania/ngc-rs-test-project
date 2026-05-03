import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';
import { APP_CONFIG } from './features/di-pipes-directives/tokens/app-config.token';
import { FEATURE_FLAGS } from './features/di-pipes-directives/tokens/feature-flags.token';
import { authInterceptor } from './features/http-client/auth.interceptor';
import { loggingInterceptor } from './features/http-client/logging.interceptor';
import { errorInterceptor } from './features/http-client/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor, errorInterceptor])),
    {
      provide: APP_CONFIG,
      useValue: { appName: 'ng-feature-ref', apiBase: 'https://jsonplaceholder.typicode.com' },
    },
    { provide: FEATURE_FLAGS, useValue: 'reactive-forms', multi: true },
    { provide: FEATURE_FLAGS, useValue: 'http-demo', multi: true },
    { provide: FEATURE_FLAGS, useValue: 'protected-route', multi: true },
  ],
};
