import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { debounce } from 'lodash-es';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-171-vendor-treeshake',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="Per-provider vendor tree-shake"
      groupLabel="Build options"
      description="Only the providers/exports a vendor library actually uses should land in the vendor chunk — unused exports of a bundled dependency must tree-shake away, not just split into a shared chunk."
      [issue]="171"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> after a vendor lib is placed in a shared chunk, dead-code
          elimination should still run <em>inside</em> that chunk. This page imports exactly one
          export — <code>debounce</code> — from the tree-shakeable <code>lodash-es</code>. The
          bundle should carry only <code>debounce</code>'s reachable code, not the rest of lodash.
        </p>
        <p>
          <strong>How this differs from #131:</strong>
          <a href="https://github.com/lukekania/ngc-rs/issues/131" target="_blank" rel="noopener">#131</a>
          is about <em>placement</em> — moving npm deps referenced by ≥2 chunks into a shared
          vendor chunk. <strong>#171</strong> is about <em>size</em> — per-provider tree-shake so
          the chunk drops the exports nothing reaches. A lib can be correctly split (#131) and
          still be bloated (#171).
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> the whole package body is retained once it's
          bundled, so the chunk carries unused providers/exports that <code>ng build</code> would
          have shaken out.
        </p>
      </ng-container>

      <h3>Live demo — the single used export</h3>
      <p>
        <input
          type="text"
          placeholder="type fast…"
          (input)="onType($event)"
          aria-label="debounced input"
        />
      </p>
      <p>
        immediate keystrokes: <strong>{{ rawCount() }}</strong> ·
        debounced (400&nbsp;ms) value: <strong>{{ debounced() || '—' }}</strong>
      </p>
      <p class="muted">
        Powered by <code>import {{ '{' }} debounce {{ '}' }} from 'lodash-es'</code> — the only
        lodash export this app references.
      </p>

      <h3>How this is verified</h3>
      <ul>
        <li>This page imports only <code>debounce</code>; every other lodash export is unreferenced.</li>
        <li>
          Verify by <strong>chunk size</strong>, not by grepping names: a
          <em>production</em> build tree-shakes but minifies (names gone), while a
          <em>development</em> build keeps names but doesn't tree-shake — and lodash's own JSDoc
          comments mention sibling methods, so name-greps give false positives either way.
        </li>
        <li>
          Build production, then compare this route's chunk in <code>dist/test-ng-project/</code>
          (ngc-rs emits a <em>flat</em> layout — no <code>browser/</code> subfolder) against a
          trivial sibling such as <code>/if-alias</code>. Tree-shaken, the delta is a few KB
          (just <code>debounce</code>); un-shaken, it balloons by ~the whole lodash library.
        </li>
        <li>For a parity baseline, build the same source with <code>&#64;angular/build:application</code> and compare the same chunk.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [
    `
      input { padding: 0.3rem 0.5rem; min-width: 16rem; }
      .muted { color: #78909c; font-size: 0.85rem; }
    `,
  ],
})
export class Issue171VendorTreeshakeComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  protected readonly rawCount = signal(0);
  protected readonly debounced = signal('');

  // Real use of the single imported lodash export, so the bundler must retain it.
  // The set runs inside lodash's setTimeout — outside any Angular tick — so on a
  // zoneless + OnPush component we notify change detection explicitly.
  private readonly commit = debounce((value: string) => {
    this.debounced.set(value);
    this.cdr.markForCheck();
  }, 400);

  onType(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.rawCount.update((n) => n + 1);
    this.commit(value);
  }
}
