import { Component, signal } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-145-hmr',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="Hot Module Replacement"
      groupLabel="Dev server"
      description="Component-state survives template/style edits — no full page reload, no lost form state, no scroll-position jump."
      [issue]="145"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> editing a component's template, styles, or even logic should
          surgically replace the changed module rather than reloading the whole page.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> live-reload (full page reload via SSE) is
          implemented; HMR (<code>hmr: true</code>) is silently dropped.
        </p>
        <p>
          <strong>Why it matters:</strong> any iteration cycle that depends on local state
          (open dialogs, multi-step forms, scrolled lists, populated inputs) is multiple
          seconds slower per edit when forced to reload.
        </p>
      </ng-container>

      <h3>HMR-state survives reloads</h3>
      <p>
        Tap <em>+1</em> a few times, then edit this component's template (e.g. tweak this
        sentence) and save. With HMR on, the counter should keep its value; with full reload,
        it resets to 0.
      </p>
      <div class="counter">
        <button (click)="bump()">+1</button>
        <span>count: {{ count() }}</span>
      </div>

      <h3>angular.json</h3>
      <pre><code>"serve": &#123;
  "options": &#123;
    "hmr": true
  &#125;
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>Edit a <code>.css</code> file — styles replace in place, count above stays.</li>
        <li>Edit a <code>.html</code> template — affected component re-renders, parent state stays.</li>
        <li>Edit a <code>.ts</code> file — falls back to full reload (component-class swap is the hardest part; defer to follow-up).</li>
        <li><code>hmr: false</code> (default) keeps today's full-reload behavior.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`
    .counter { display: flex; gap: 0.75rem; align-items: center; padding: 0.75rem; background: #eceff1; border-radius: 4px; margin: 0.75rem 0; }
    pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }
  `],
})
export class Issue145HmrComponent {
  readonly count = signal(0);
  bump() { this.count.update((n) => n + 1); }
}
