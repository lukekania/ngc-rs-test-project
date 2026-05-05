import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-155-stats-progress-verbose',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="statsJson / progress / verbose"
      groupLabel="Build options"
      description="Three observability flags currently no-op'd: statsJson (webpack-bundle-analyzer), progress (TTY progress bar), verbose (RUST_LOG=info)."
      [issue]="155"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>statsJson:</strong> emit <code>dist/stats.json</code> in webpack-stats schema
          for <code>webpack-bundle-analyzer</code> compatibility. The data already exists in
          <code>ngc_bundler::ChunkGraph</code> — just needs serialization.
        </p>
        <p>
          <strong>progress:</strong> tracing-subscriber-driven progress bar to stderr in TTY
          mode; skip in non-TTY (CI).
        </p>
        <p>
          <strong>verbose:</strong> equivalent to <code>RUST_LOG=info</code>. Adjusts the
          tracing-subscriber filter at runtime when set, so users don't need the env var.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> all three are silently ignored.
        </p>
      </ng-container>

      <h3>angular.json + CLI</h3>
      <pre><code>"options": &#123;
  "statsJson": true,
  "progress": true,
  "verbose": true
&#125;

# or per-build flags
ng build --stats-json --verbose</code></pre>

      <h3>Verification</h3>
      <ul>
        <li><code>statsJson: true</code> emits <code>dist/stats.json</code> consumable by <code>webpack-bundle-analyzer</code>.</li>
        <li><code>progress: true</code> shows a per-stage progress bar in interactive shells.</li>
        <li><code>verbose: true</code> matches <code>RUST_LOG=info</code> output without needing the env var.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue155StatsProgressVerboseComponent {}
