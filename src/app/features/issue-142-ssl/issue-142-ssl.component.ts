import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-142-ssl',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="dev-server SSL"
      groupLabel="Dev server"
      description="ssl / sslKey / sslCert options for HTTPS dev — needed for OAuth callbacks, secure-cookie testing, service-worker registration, mixed-content debugging."
      [issue]="142"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> <code>ssl: true</code> auto-generates a self-signed cert;
          explicit <code>sslKey</code>/<code>sslCert</code> paths use those certs. Live-reload
          SSE has to work over TLS too.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> hard-fails with <code>OptionTranslationError</code>
          if any of the three flags is set. Workaround: run a TLS-terminating proxy in front of
          <code>ngc-rs serve</code>.
        </p>
        <p>
          <strong>Why it matters:</strong> service workers refuse to register over plain HTTP;
          most OAuth providers reject non-HTTPS callback URLs.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"serve": &#123;
  "options": &#123;
    "ssl": true,
    "sslKey": "./certs/dev.key",
    "sslCert": "./certs/dev.crt"
  &#125;
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li><code>ng serve</code> with <code>ssl: true</code> boots an HTTPS dev server (browsers accept the auto-generated cert with the usual self-signed warning).</li>
        <li>SSE for live-reload connects over TLS.</li>
        <li>Implementation candidates: <code>tiny_http</code>'s <code>ssl-rustls</code> feature, or swap to <code>hyper-rustls</code>.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue142SslComponent {}
