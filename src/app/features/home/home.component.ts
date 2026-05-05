import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureLink {
  label: string;
  path: string;
  blurb: string;
  issue?: number;
}

interface FeatureGroup {
  label: string;
  items: FeatureLink[];
}

const GROUPS: FeatureGroup[] = [
  {
    label: 'Components & Templates',
    items: [
      { label: '@defer blocks', path: '/defer', issue: 56, blurb: 'every defer trigger + sub-blocks' },
      { label: 'hostDirectives', path: '/host-directives', issue: 57, blurb: 'compose directives onto a host' },
      { label: '@HostBinding / @HostListener', path: '/host-bindings', issue: 58, blurb: 'attr/style/class targets, listeners' },
      { label: 'SVG & MathML namespaces', path: '/svg', issue: 60, blurb: 'inline SVG and foreignObject' },
      { label: 'DI, Pipes, Directives, Projection', path: '/di', blurb: 'tokens, custom pipes/directives, ng-content slots' },
    ],
  },
  {
    label: 'Reactivity',
    items: [
      { label: 'Signal APIs', path: '/signals', issue: 55, blurb: 'inputs, outputs, models, queries' },
    ],
  },
  {
    label: 'Routing',
    items: [
      { label: 'Routing patterns', path: '/routing-patterns', blurb: 'guards, resolver, child routes, input binding' },
    ],
  },
  {
    label: 'Forms',
    items: [
      { label: 'Forms', path: '/forms', blurb: 'reactive + template-driven, sync & async validators' },
    ],
  },
  {
    label: 'HTTP & Async',
    items: [
      { label: 'HttpClient & interceptors', path: '/http', blurb: 'auth, logging, error interceptors' },
      { label: 'Web worker', path: '/web-worker', issue: 66, blurb: 'off-thread work via new Worker(new URL(...))' },
    ],
  },
  {
    label: 'i18n & Styling',
    items: [
      { label: 'i18n, ICU, $localize', path: '/i18n', issue: 62, blurb: 'i18n attrs, plural/select, runtime $localize' },
      { label: 'SCSS component styles', path: '/scss', issue: 61, blurb: 'styleUrl + inline SCSS preprocessing' },
      { label: 'Animation triggers', path: '/animations', issue: 59, blurb: '[@trigger], state, :enter / :leave' },
      { label: 'XLIFF 2.0', path: '/xliff-v2', issue: 141, blurb: 'modern i18n format (extract + translate)' },
      { label: 'localize subset', path: '/localize-subset', issue: 147, blurb: '--localize=en,de filters declared locales' },
      { label: 'per-locale ngsw', path: '/per-locale-ngsw', issue: 148, blurb: 'one ngsw.json per locale subdirectory' },
    ],
  },
  {
    label: 'Build & Platform',
    items: [
      { label: 'package.json imports', path: '/package-imports', issue: 63, blurb: '#subpath imports field' },
      { label: 'Exports conditions', path: '/exports-conditions', issue: 64, blurb: 'browser/import/production resolution' },
      { label: 'Service worker', path: '/service-worker', issue: 65, blurb: 'ngsw-config.json + SwUpdate' },
      { label: 'index.html options', path: '/index-html-options', issue: 67, blurb: 'baseHref / deployUrl / SRI / crossOrigin' },
    ],
  },
  {
    label: 'Build options',
    items: [
      { label: 'Vendor chunk splitting', path: '/vendor-chunks', issue: 131, blurb: 'shared chunks for npm deps referenced by ≥2 entries' },
      { label: 'define replacement', path: '/define', issue: 137, blurb: 'angular.json define → build-time string replacement' },
      { label: 'scripts array', path: '/scripts-array', issue: 138, blurb: 'global script injection into index.html' },
      { label: 'strictTemplates', path: '/strict-templates', issue: 140, blurb: 'hard-error on JIT-fallback in production' },
      { label: 'externalDependencies', path: '/external-deps', issue: 146, blurb: 'leave specified packages external (CDN / import-map)' },
      { label: 'namedChunks', path: '/named-chunks', issue: 153, blurb: 'human-readable chunk filenames in dev' },
      { label: 'allowedCommonJsDependencies', path: '/cjs-deps', issue: 154, blurb: 'CJS-warning suppression list' },
      { label: 'stats / progress / verbose', path: '/stats-json', issue: 155, blurb: 'observability flags (bundle analyzer, progress bar, log level)' },
      { label: 'preserveSymlinks', path: '/preserve-symlinks', issue: 156, blurb: 'pnpm / yarn-link monorepo resolution' },
      { label: 'extractLicenses', path: '/extract-licenses', issue: 157, blurb: 'opt out of dist/3rdpartylicenses.txt emission' },
    ],
  },
  {
    label: 'Dev server',
    items: [
      { label: 'servePath', path: '/serve-path', issue: 139, blurb: 'mount dev server under subpath (/admin/)' },
      { label: 'SSL / HTTPS', path: '/dev-server-ssl', issue: 142, blurb: 'ssl / sslKey / sslCert for HTTPS dev' },
      { label: 'Custom headers', path: '/dev-server-headers', issue: 143, blurb: 'CSP / COOP / cache-control headers in dev' },
      { label: 'allowedHosts', path: '/allowed-hosts', issue: 144, blurb: 'Host-header allowlist (ngrok, Codespaces, *.localhost)' },
      { label: 'HMR', path: '/hmr', issue: 145, blurb: 'hot-module replacement — component state survives edits' },
      { label: 'poll watch', path: '/poll-watch', issue: 149, blurb: 'polling fallback for NFS / Docker bind-mounts / WSL' },
      { label: 'liveReload', path: '/live-reload', issue: 150, blurb: 'toggle auto-reload SSE channel' },
      { label: 'inspect', path: '/inspect', issue: 151, blurb: 'forward --inspect to dev-server subprocesses' },
      { label: 'prebundle', path: '/prebundle', issue: 152, blurb: 'esbuild pre-bundling cache control' },
    ],
  },
];

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <h1>Angular feature reference</h1>
      <p class="lede">
        Working examples of Angular's web-app capabilities. Each page is a small, isolated demo —
        also used as a validation surface for
        <a href="https://github.com/angular/angular" target="_blank" rel="noopener">ngc-rs</a>,
        a Rust-based Angular compiler.
      </p>
    </section>

    @for (group of groups; track group.label) {
      <section class="group">
        <h2>{{ group.label }}</h2>
        <ul class="grid">
          @for (item of group.items; track item.path) {
            <li>
              <a [routerLink]="item.path">
                <span class="label">{{ item.label }}</span>
                <span class="blurb">{{ item.blurb }}</span>
                @if (item.issue !== undefined) {
                  <span class="issue">ngc-rs #{{ item.issue }}</span>
                }
              </a>
            </li>
          }
        </ul>
      </section>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 64rem;
        margin: 0 auto;
        padding: 1rem;
      }
      .hero {
        margin-bottom: 2rem;
      }
      .hero h1 {
        margin: 0 0 0.5rem;
      }
      .hero .lede {
        color: #455a64;
        margin: 0;
      }
      .group {
        margin-bottom: 1.75rem;
      }
      .group h2 {
        font-size: 0.95rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #607d8b;
        border-bottom: 1px solid #cfd8dc;
        padding-bottom: 0.25rem;
        margin: 0 0 0.75rem;
      }
      .grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 0.5rem;
      }
      a {
        display: block;
        padding: 0.75rem;
        background: #eceff1;
        border-radius: 6px;
        text-decoration: none;
        color: inherit;
      }
      a:hover {
        background: #cfd8dc;
      }
      .label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.15rem;
      }
      .blurb {
        display: block;
        font-size: 0.85rem;
        color: #455a64;
      }
      .issue {
        display: inline-block;
        margin-top: 0.35rem;
        font-size: 0.7rem;
        color: #78909c;
        font-variant-numeric: tabular-nums;
      }
    `,
  ],
})
export class HomeComponent {
  protected readonly groups = GROUPS;
}
