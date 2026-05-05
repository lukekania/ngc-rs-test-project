import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-148-per-locale-ngsw',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="per-locale ngsw.json"
      groupLabel="i18n & Styling"
      description="When --localize is in use, the service worker manifest must be emitted per locale subdirectory — the asset hashes differ per locale."
      [issue]="148"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> a localized build emits one app per locale under
          <code>dist/&lt;locale&gt;/</code>. Each subdirectory needs its own
          <code>ngsw.json</code> with hashes for the files in <em>that</em> locale, otherwise
          the service worker can't validate updates.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> ngsw generation is skipped entirely when
          <code>--localize</code> is set, with the warning "per-locale manifests are not yet
          supported". Apps that need both i18n and a service worker can have only one.
        </p>
        <p>
          <strong>Why it matters:</strong> PWA caching with i18n is a standard combination —
          dropping ngsw on i18n builds breaks the cache-update contract.
        </p>
      </ng-container>

      <h3>Expected output</h3>
      <pre><code>dist/test-app/
├── en/
│   ├── index.html
│   ├── main-DEADBEEF.js
│   └── ngsw.json   # hashes match en/ files
├── de/
│   ├── index.html
│   ├── main-CAFEBABE.js
│   └── ngsw.json   # hashes match de/ files
└── ngsw-worker.js  # shared</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>Each locale subdirectory has its own <code>ngsw.json</code>.</li>
        <li>Hashes in <code>en/ngsw.json</code> match files in <code>en/</code>; hashes in <code>de/ngsw.json</code> match files in <code>de/</code>.</li>
        <li>The same logical translation in two locales produces different hashes (correct cache invalidation).</li>
        <li>Drop the "skipping ngsw.json" warning once per-locale generation works.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; font-size: 0.85rem; }`],
})
export class Issue148PerLocaleNgswComponent {}
