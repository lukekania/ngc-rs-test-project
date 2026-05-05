import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-153-named-chunks',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="namedChunks"
      groupLabel="Build options"
      description="namedChunks: true emits stable, human-readable chunk filenames in dev (main.js, chunk-foo.js) instead of content-hashed names."
      [issue]="153"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> the bundler already supports both modes — production hashes
          for cache-busting, dev for HTTP-cache debugging or tooling that reads filenames
          directly. <code>namedChunks</code> is the per-configuration toggle.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> silently overridden — production always
          hashes, dev never hashes, no toggle in between.
        </p>
        <p>
          <strong>Why it matters:</strong> wiring change, not a new feature. Just needs to read
          the angular.json field and override the configuration default.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"configurations": &#123;
  "production": &#123;
    "namedChunks": false,
    "outputHashing": "all"
  &#125;,
  "development": &#123;
    "namedChunks": true
  &#125;
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>Dev build with <code>namedChunks: true</code> emits <code>chunk-foo.js</code> based on the source filename, not <code>chunk-A1B2C3D4.js</code>.</li>
        <li>Production build with <code>namedChunks: false</code> still hashes for cache-busting.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue153NamedChunksComponent {}
