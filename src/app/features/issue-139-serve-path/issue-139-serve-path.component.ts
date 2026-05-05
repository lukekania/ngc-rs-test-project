import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-139-serve-path',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="dev-server servePath"
      groupLabel="Dev server"
      description="Mount the dev server under a subpath (e.g. /admin/, /app/) so local dev mirrors production deploys behind reverse proxies."
      [issue]="139"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> the dev-server's <code>servePath</code> option mounts
          <code>dist/</code> under a URL prefix instead of <code>/</code>. SPA fallback,
          static-file lookup, and the live-reload SSE channel all become prefix-aware.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> the option is silently dropped — every dev
          server boots at <code>/</code>. Apps deployed under a subpath have to manually rewrite
          paths or run behind a TLS-terminating proxy that strips the prefix.
        </p>
        <p>
          <strong>Why it matters:</strong> production-parity local dev (router base href, asset
          URLs, OAuth redirect URIs) when the app ships under <code>/admin/</code>.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"serve": &#123;
  "options": &#123;
    "servePath": "/admin/"
  &#125;
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li><code>http://localhost:4200/admin/</code> serves the SPA.</li>
        <li>Deep links like <code>/admin/users/42</code> route via SPA fallback to <code>/admin/index.html</code>.</li>
        <li>The live-reload SSE endpoint (<code>/__ngc_reload</code>) is also prefix-aware.</li>
        <li>When <code>servePath</code> is set without an explicit <code>baseHref</code>, <code>&lt;base href&gt;</code> auto-resolves to the servePath.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue139ServePathComponent {}
