import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-144-allowed-hosts',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="dev-server allowedHosts"
      groupLabel="Dev server"
      description="Host-header allowlist for tunneled local dev (ngrok, Cloudflare Tunnel, GitHub Codespaces, *.localhost)."
      [issue]="144"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> the dev server filters incoming requests by their
          <code>Host:</code> header and returns 403 for non-allowed hosts. Special values:
          <code>"all"</code> accepts any, <code>"auto"</code> accepts localhost + the bound
          host.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> silently dropped — <code>tiny_http</code>
          accepts any Host header by default. Permissive but doesn't expose the security knob
          users expect.
        </p>
        <p>
          <strong>Why it matters:</strong> Vite-style dev servers default to enforcing the
          check; users coming from that ecosystem expect it.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"serve": &#123;
  "options": &#123;
    "allowedHosts": [
      "my-app.ngrok.io",
      "*.app.localhost"
    ]
  &#125;
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li><code>"allowedHosts": ["my-app.ngrok.io"]</code> lets ngrok-tunneled traffic through.</li>
        <li><code>"allowedHosts": ["all"]</code> disables the check entirely.</li>
        <li>A request to a non-allowed host returns 403 with a clear error body.</li>
        <li>Default: accept <code>localhost</code>, <code>127.0.0.1</code>, <code>[::1]</code>; <code>auto</code> resolves to the bind address.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue144AllowedHostsComponent {}
