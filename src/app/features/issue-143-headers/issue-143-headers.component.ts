import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-143-headers',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="dev-server custom headers"
      groupLabel="Dev server"
      description="angular.json's headers map adds custom HTTP response headers (CSP, COOP, CORS, cache-control) to every dev-server response."
      [issue]="143"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> a string-keyed map of headers applied to every static-file,
          SPA-fallback, and SSE response. Used to test production-like security headers in dev,
          or to exercise CORS preflight scenarios locally.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> silently dropped — apps that depend on
          production-like headers in dev have no recourse.
        </p>
        <p>
          <strong>Why it matters:</strong> CSP / COOP / COEP often surface bugs that only
          appear once the headers are present. Catching them in dev avoids prod surprises.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"serve": &#123;
  "options": &#123;
    "headers": &#123;
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cache-Control": "no-store"
    &#125;
  &#125;
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li><code>curl -I http://localhost:4200/</code> returns the configured headers on the index.html response.</li>
        <li>Headers also present on JS/CSS asset responses and SPA fallback hits.</li>
        <li>Don't override headers ngc-rs sets itself (e.g. don't let user <code>Content-Type</code> clobber the correct one).</li>
        <li>Proxy-forwarded responses keep upstream headers (don't re-write proxied responses).</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue143HeadersComponent {}
