import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-146-external-deps',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="externalDependencies"
      groupLabel="Build options"
      description="Exclude listed npm packages from the bundle — leave the bare specifier in the emitted code so a CDN or import-map can resolve it at runtime."
      [issue]="146"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> packages listed in <code>externalDependencies</code> are not
          inlined into the bundle. Their <code>import</code> statements stay as bare specifiers
          (<code>import $ from 'jquery'</code>) for the runtime to resolve.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> silently overridden — every import gets
          bundled. Apps loading jQuery from a CDN, lazy-loading <code>&#64;stripe/stripe-js</code>,
          or shipping an import-map cannot tell ngc-rs to leave specific imports external.
        </p>
        <p>
          <strong>Why it matters:</strong> CDN-shared libraries, import-map workflows, and
          micro-frontend hosts all rely on this.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"externalDependencies": [
  "jquery",
  "&#64;stripe/stripe-js"
]</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>The emitted bundle contains <code>import $ from 'jquery'</code> as-is — not the inlined module body.</li>
        <li>The npm-resolver doesn't BFS into <code>jquery</code>'s deps when it's external.</li>
        <li>An <code>&lt;script type="importmap"&gt;</code> in <code>index.html</code> can map the bare specifier to a CDN URL.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue146ExternalDepsComponent {}
