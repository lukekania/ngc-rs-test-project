import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-140-strict-templates',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="strictTemplates: hard-error on JIT fallback"
      groupLabel="Build options"
      description="Production builds should fail rather than silently fall back to JIT-compilation when the template compiler hits unsupported syntax."
      [issue]="140"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> when ngc-rs's template compiler encounters syntax it doesn't
          fully understand, today it falls back to JIT-compiling at runtime and emits a
          <em>warning</em>. Strict mode (matching <code>&#64;angular/build:application</code>'s
          default) makes any JIT fallback a build error.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> JIT fallback is silent in production builds. A
          template using a syntax the parser doesn't support quietly ships a slower, larger
          bundle.
        </p>
        <p>
          <strong>Why it matters:</strong> Angular's official builder has no JIT fallback —
          ngc-rs's softer behavior is a footgun.
        </p>
      </ng-container>

      <h3>tsconfig.json (already present)</h3>
      <pre><code>"angularCompilerOptions": &#123;
  "strictTemplates": true
&#125;</code></pre>

      <h3>Proposed CLI flag</h3>
      <pre><code>ngc-rs build --strict-templates</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>A component using genuinely unsupported template syntax fails the production build with a clear error pointing at the source location.</li>
        <li>The same component still falls back to JIT in <code>-c development</code> so dev iteration isn't blocked.</li>
        <li>Default off in development, on in production (matching <code>&#64;angular/build:application</code>).</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue140StrictTemplatesComponent {}
