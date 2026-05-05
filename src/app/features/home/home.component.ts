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
