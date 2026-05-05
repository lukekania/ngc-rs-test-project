import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-156-preserve-symlinks',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="preserveSymlinks"
      groupLabel="Build options"
      description="Resolve through symlinks rather than canonicalizing paths — required for pnpm workspaces and yarn link-protocol monorepos."
      [issue]="156"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> when <code>preserveSymlinks: true</code>, every path resolves
          through its symlink chain unchanged. Without it, paths get canonicalized to their
          physical-disk location.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> silently overridden — every path is
          canonicalized via cached <code>canonicalize()</code>. Perf optimization, but it
          breaks pnpm-style monorepos where two distinct logical packages point at the same
          physical directory.
        </p>
        <p>
          <strong>Why it matters:</strong> pnpm and yarn link-protocol are common in monorepo
          workflows; canonicalization collapses logical packages into one and changes module
          identity.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"options": &#123;
  "preserveSymlinks": true
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>A pnpm-style monorepo where two packages depend on different symlinked versions of a shared utility resolves both correctly.</li>
        <li>Implementation: replace <code>cached_canonicalize</code> calls with a function that returns the input path unchanged when the flag is set.</li>
        <li>Both <code>bundler/concat.rs</code> and the npm-resolver canonicalize today — both need the flag.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue156PreserveSymlinksComponent {}
