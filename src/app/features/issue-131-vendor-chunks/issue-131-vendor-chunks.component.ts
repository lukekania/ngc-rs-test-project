import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-131-vendor-chunks',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="Vendor chunk splitting"
      groupLabel="Build options"
      description="npm dependencies referenced from multiple chunks should split into shared vendor chunks (chunk-<8hex>.js), not be inlined into main.js."
      [issue]="131"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> any module under <code>node_modules/</code> referenced by ≥2
          chunks should move into a shared vendor chunk. Modules referenced by exactly one chunk
          inline into that chunk; modules referenced only by <code>main</code> stay in
          <code>main.js</code>.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> every npm dep gets bundled into
          <code>main.js</code>, blowing initial-bundle size up by ~16× vs <code>ng build</code>
          on real projects (1.5 MB vs 95 KB measured).
        </p>
        <p>
          <strong>Why it matters:</strong> initial-bundle parse cost and cache invalidation
          across deploys both depend on stable, shared vendor chunks.
        </p>
      </ng-container>

      <h3>Expected chunk shape</h3>
      <table class="grid">
        <thead>
          <tr><th></th><th>ngc-rs (current)</th><th>ng build</th></tr>
        </thead>
        <tbody>
          <tr><td><code>main.js</code> raw</td><td>1.5 MB</td><td>95 KB</td></tr>
          <tr><td>Initial total</td><td>~1.7 MB</td><td>917 KB</td></tr>
          <tr><td>Lazy chunks</td><td>split</td><td>split</td></tr>
          <tr><td>Vendor chunks</td><td>in main</td><td>~12 anonymous chunks</td></tr>
        </tbody>
      </table>

      <h3>Verification</h3>
      <ul>
        <li>Run <code>ng build</code> and <code>ngc-rs build</code> against the same project.</li>
        <li>Diff <code>dist/</code>: ngc-rs should emit <code>chunk-&lt;8hex&gt;.js</code> files alongside <code>main.js</code>.</li>
        <li>Index.html should carry <code>&lt;script&gt;</code> tags for every initial chunk, not just main.</li>
        <li>Lazy chunks (already correct) keep their existing layout.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [
    `
      .grid {
        border-collapse: collapse;
        margin: 0.5rem 0 1rem;
      }
      .grid th,
      .grid td {
        border: 1px solid #cfd8dc;
        padding: 0.4rem 0.75rem;
        text-align: left;
      }
      .grid th {
        background: #eceff1;
      }
    `,
  ],
})
export class Issue131VendorChunksComponent {}
