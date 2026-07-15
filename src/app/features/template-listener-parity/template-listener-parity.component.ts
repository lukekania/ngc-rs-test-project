import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

/**
 * Repro for two template-compiler parity gaps surfaced against test-ng-project:
 *
 *  - `$any(...)` must be treated as a compile-time cast and stripped, like
 *    `ng build` does. ngc-rs previously emitted a runtime `ctx.$any(...)`
 *    call → `TypeError: ctx.$any is not a function`.
 *  - A template reference variable read inside a *root-level* listener
 *    (`<input #box (input)="f(box.value)">`) must be wired into the generated
 *    listener via `ɵɵreference(slot)`. ngc-rs previously left `box` as a bare
 *    identifier → `ReferenceError: Can't find variable: box`.
 *
 * Both handlers below must run without throwing for parity.
 */
@Component({
  selector: 'app-template-listener-parity',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="$any() cast + template-ref listeners"
      groupLabel="Components & Templates"
      description="$any() must be stripped as a compile-time cast, and a #ref read inside a root-level listener must resolve via ɵɵreference — both at parity with ng build."
      [issue]="0"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>$any():</strong> Angular removes <code>$any()</code> at compile time. The
          input below feeds <code>$any($event.target).value</code> straight into a handler; if
          ngc-rs emits <code>ctx.$any(...)</code> it throws at the first keystroke.
        </p>
        <p>
          <strong>#ref in listener:</strong> the second input declares <code>#box</code> and its
          listener reads <code>box.value</code>. The generated listener must declare
          <code>const box = ɵɵreference(slot)</code>; otherwise <code>box</code> is undefined at
          runtime.
        </p>
      </ng-container>

      <h3>$any() cast</h3>
      <p>
        <input
          type="text"
          placeholder="type — uses $any()"
          (input)="onAny($any($event.target).value)"
          aria-label="any-cast input"
        />
        last value via $any(): <strong>{{ anyValue() || '—' }}</strong>
      </p>

      <h3>Template reference in a root-level listener</h3>
      <p>
        <input #box type="text" placeholder="type — reads #box" (input)="onRef(box.value)" aria-label="ref input" />
        last value via #box: <strong>{{ refValue() || '—' }}</strong>
      </p>
    </app-feature-page>
  `,
})
export class TemplateListenerParityComponent {
  protected readonly anyValue = signal('');
  protected readonly refValue = signal('');

  onAny(value: string): void {
    this.anyValue.set(value);
  }

  onRef(value: string): void {
    this.refValue.set(value);
  }
}
