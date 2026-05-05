import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-150-live-reload',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="liveReload toggle"
      groupLabel="Dev server"
      description="liveReload: false disables the auto-reload SSE channel — useful for testing bundle-cache scenarios or persistent reconnect handling without reloads firing."
      [issue]="150"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> when <code>liveReload: false</code>, the dev server doesn't
          inject the SSE-listener script into <code>index.html</code>, so saving a file doesn't
          trigger a reload in the browser.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> live-reload is hardcoded on. The only escape
          hatch today is to manually disconnect the SSE channel in DevTools.
        </p>
        <p>
          <strong>Why it matters:</strong> testing manual-refresh flows, validating
          stale-bundle behavior, debugging reconnect logic.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"serve": &#123;
  "options": &#123;
    "liveReload": false
  &#125;
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>With <code>liveReload: false</code>, <code>index.html</code> has no SSE-listener <code>&lt;script&gt;</code> injected.</li>
        <li>Saving a file produces a rebuild but the browser stays on the stale bundle until manually refreshed.</li>
        <li>Default <code>true</code> matches today's behavior.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue150LiveReloadComponent {}
