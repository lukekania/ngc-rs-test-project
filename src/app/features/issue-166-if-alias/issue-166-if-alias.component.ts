import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-166-if-alias',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="@if (expr; as alias)"
      groupLabel="Components & Templates"
      description="The new control-flow @if can alias its truthy condition value with ; as x and bind that value at runtime, so the branch reuses it without re-reading the source expression."
      [issue]="166"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> <code>&#64;if (expr; as alias)</code> evaluates
          <code>expr</code>, and inside the branch <code>alias</code> is bound to that
          <em>value</em>. It is the control-flow equivalent of the old
          <code>*ngIf="expr as alias"</code>.
        </p>
        <p>
          <strong>Why it matters:</strong> aliasing a pipe result, an expensive getter, or a
          <code>signal()</code> read lets the branch reference the value by name instead of
          re-evaluating the source expression. ngc-rs must emit the runtime alias binding, not
          just gate the branch.
        </p>
      </ng-container>

      <h3>Live demo</h3>
      <p>
        <button type="button" (click)="bump()">next value</button>
        <span class="muted"> (tick {{ tick() }})</span>
      </p>

      @if (lookup(); as user) {
        <p data-testid="alias-output">
          aliased once → name: <strong>{{ user.name }}</strong>, role:
          <strong>{{ user.role }}</strong>, id: <strong>{{ user.id }}</strong>
        </p>
      } @else {
        <p data-testid="alias-output">condition is falsy — no alias bound (&#64;else branch)</p>
      }

      <pre><code>{{ codeSample }}</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>The aliased <code>user</code> renders all three fields of the object returned by <code>lookup()</code>.</li>
        <li>
          The branch references <code>user</code> three times but <code>lookup()</code> is written
          once in the condition — proving the alias binds the evaluated value, not the expression.
        </li>
        <li>Every fourth tick returns <code>null</code>, so the <code>&#64;else</code> branch renders and no alias is bound.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [
    `
      pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }
      button { cursor: pointer; padding: 0.3rem 0.7rem; }
      .muted { color: #78909c; font-size: 0.85rem; margin-left: 0.5rem; }
    `,
  ],
})
export class Issue166IfAliasComponent {
  protected readonly tick = signal(1);

  protected readonly codeSample = [
    '@if (lookup(); as user) {',
    '  {{ user.name }} / {{ user.role }} / {{ user.id }}',
    '} @else {',
    '  condition is falsy',
    '}',
  ].join('\n');

  private readonly users = [
    { id: 'u-1', name: 'Ada', role: 'admin' },
    { id: 'u-2', name: 'Bo', role: 'editor' },
    { id: 'u-3', name: 'Cy', role: 'viewer' },
  ];

  // Aliased via `; as user`. Every 4th tick is null to exercise the @else branch.
  protected readonly lookup = computed(() => {
    const n = this.tick();
    return n % 4 === 0 ? null : this.users[n % this.users.length];
  });

  bump(): void {
    this.tick.update((n) => n + 1);
  }
}
