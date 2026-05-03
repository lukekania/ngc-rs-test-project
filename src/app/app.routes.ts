import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent) },
  {
    path: 'signals',
    loadComponent: () => import('./features/signals/signals.component').then((m) => m.SignalsComponent),
  },
  {
    path: 'defer',
    loadComponent: () => import('./features/defer/defer.component').then((m) => m.DeferComponent),
  },
  {
    path: 'host-directives',
    loadComponent: () =>
      import('./features/host-directives/host-directives.component').then((m) => m.HostDirectivesComponent),
  },
  {
    path: 'host-bindings',
    loadComponent: () =>
      import('./features/host-bindings/host-bindings.component').then((m) => m.HostBindingsComponent),
  },
  {
    path: 'animations',
    loadComponent: () =>
      import('./features/animations/animations.component').then((m) => m.AnimationsComponent),
  },
  {
    path: 'svg',
    loadComponent: () =>
      import('./features/svg-namespace/svg-namespace.component').then((m) => m.SvgNamespaceComponent),
  },
  {
    path: 'scss',
    loadComponent: () =>
      import('./features/scss-styles/scss-styles.component').then((m) => m.ScssStylesComponent),
  },
  {
    path: 'i18n',
    loadComponent: () => import('./features/i18n/i18n.component').then((m) => m.I18nComponent),
  },
  {
    path: 'package-imports',
    loadComponent: () =>
      import('./features/package-imports/package-imports.component').then((m) => m.PackageImportsComponent),
  },
  {
    path: 'exports-conditions',
    loadComponent: () =>
      import('./features/exports-conditions/exports-conditions.component').then(
        (m) => m.ExportsConditionsComponent,
      ),
  },
  {
    path: 'service-worker',
    loadComponent: () =>
      import('./features/service-worker/service-worker.component').then((m) => m.ServiceWorkerComponent),
  },
  {
    path: 'web-worker',
    loadComponent: () =>
      import('./features/web-worker/web-worker.component').then((m) => m.WebWorkerComponent),
  },
  {
    path: 'index-html-options',
    loadComponent: () =>
      import('./features/index-html-options/index-html-options.component').then(
        (m) => m.IndexHtmlOptionsComponent,
      ),
  },
  {
    path: 'di',
    loadComponent: () =>
      import('./features/di-pipes-directives/di-pipes-directives.component').then(
        (m) => m.DiPipesDirectivesComponent,
      ),
  },
  {
    path: 'forms',
    loadComponent: () =>
      import('./features/forms/forms.component').then((m) => m.FormsDemoComponent),
  },
  {
    path: 'http',
    loadComponent: () =>
      import('./features/http-client/http-client.component').then((m) => m.HttpClientComponent),
  },
  { path: '**', redirectTo: '' },
];
