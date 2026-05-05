import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-154-cjs-deps',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="allowedCommonJsDependencies"
      groupLabel="Build options"
      description="Suppresses 'this CommonJS package was bundled' warnings for explicitly allowed packages — implies the bundler first emits such warnings."
      [issue]="154"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> ESM bundling of CJS-only packages can produce subtle bugs.
          Angular's official builder warns for any CJS-only dep not in the allowlist; users add
          known-safe packages here to suppress the noise.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> never warns at all — the bundler doesn't
          classify packages by their <code>type</code> field. Worth fixing because the warnings
          are a real signal users rely on.
        </p>
        <p>
          <strong>Why it matters:</strong> CJS-only deps are increasingly rare but the
          warning's main job is catching new ones that slip into the dep tree.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"allowedCommonJsDependencies": [
  "marked",
  "moment-timezone"
]</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>A CJS-only dep produces a warning unless allowlisted.</li>
        <li>Classification reads each resolved package's <code>"type"</code> field — <code>"module"</code>, <code>"commonjs"</code>, or missing.</li>
        <li>Surface via <code>BuildResult.warnings</code> like Angular's builder does.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue154CjsDepsComponent {}
