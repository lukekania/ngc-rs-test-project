import { Routes } from '@angular/router';
import { authGuard } from './features/routing-patterns/guards/auth.guard';
import { featureFlagGuard } from './features/routing-patterns/guards/feature-flag.guard';
import { detailResolver } from './features/routing-patterns/resolvers/detail.resolver';

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
  {
    path: 'routing-patterns',
    loadComponent: () =>
      import('./features/routing-patterns/routing-patterns.component').then(
        (m) => m.RoutingPatternsComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/routing-patterns/children/list.component').then((m) => m.ListComponent),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./features/routing-patterns/children/detail.component').then(
            (m) => m.DetailComponent,
          ),
        resolve: { item: detailResolver },
      },
      {
        path: 'protected',
        canActivate: [authGuard],
        canMatch: [featureFlagGuard('protected-route')],
        loadComponent: () =>
          import('./features/routing-patterns/children/protected.component').then(
            (m) => m.ProtectedComponent,
          ),
      },
    ],
  },
  {
    path: 'vendor-chunks',
    loadComponent: () =>
      import('./features/issue-131-vendor-chunks/issue-131-vendor-chunks.component').then(
        (m) => m.Issue131VendorChunksComponent,
      ),
  },
  {
    path: 'define',
    loadComponent: () =>
      import('./features/issue-137-define/issue-137-define.component').then(
        (m) => m.Issue137DefineComponent,
      ),
  },
  {
    path: 'scripts-array',
    loadComponent: () =>
      import('./features/issue-138-scripts/issue-138-scripts.component').then(
        (m) => m.Issue138ScriptsComponent,
      ),
  },
  {
    path: 'serve-path',
    loadComponent: () =>
      import('./features/issue-139-serve-path/issue-139-serve-path.component').then(
        (m) => m.Issue139ServePathComponent,
      ),
  },
  {
    path: 'strict-templates',
    loadComponent: () =>
      import('./features/issue-140-strict-templates/issue-140-strict-templates.component').then(
        (m) => m.Issue140StrictTemplatesComponent,
      ),
  },
  {
    path: 'xliff-v2',
    loadComponent: () =>
      import('./features/issue-141-xliff-v2/issue-141-xliff-v2.component').then(
        (m) => m.Issue141XliffV2Component,
      ),
  },
  {
    path: 'dev-server-ssl',
    loadComponent: () =>
      import('./features/issue-142-ssl/issue-142-ssl.component').then(
        (m) => m.Issue142SslComponent,
      ),
  },
  {
    path: 'dev-server-headers',
    loadComponent: () =>
      import('./features/issue-143-headers/issue-143-headers.component').then(
        (m) => m.Issue143HeadersComponent,
      ),
  },
  {
    path: 'allowed-hosts',
    loadComponent: () =>
      import('./features/issue-144-allowed-hosts/issue-144-allowed-hosts.component').then(
        (m) => m.Issue144AllowedHostsComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
