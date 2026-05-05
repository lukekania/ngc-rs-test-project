import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-152-prebundle',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="dev-server prebundle"
      groupLabel="Dev server"
      description="Controls esbuild's dependency pre-bundling — true (default), false (disable cache), or { exclude: [...] } to bypass caching for specific packages."
      [issue]="152"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> Angular's dev server pre-bundles npm deps with esbuild and
          caches the result. The <code>prebundle</code> option lets users opt out (full
          re-resolve every build) or exclude specific packages (so edits inside
          <code>node_modules/&lt;pkg&gt;</code> reflect without restart).
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> silently dropped. Impact is dev-startup
          latency only — bundles are still correct, just slower to first build for users who
          would have benefited from disabling the cache.
        </p>
        <p>
          <strong>Why it matters:</strong> active development of a linked dep that depends on
          re-resolving on every change.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"serve": &#123;
  "options": &#123;
    "prebundle": &#123;
      "exclude": ["my-linked-lib"]
    &#125;
  &#125;
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>A package in <code>exclude</code> reflects edits made directly in <code>node_modules/&lt;pkg&gt;</code> without restarting the dev server.</li>
        <li><code>prebundle: false</code> disables the npm-resolver's caching layer entirely.</li>
        <li><code>prebundle: true</code> (default) keeps current behavior.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue152PrebundleComponent {}
