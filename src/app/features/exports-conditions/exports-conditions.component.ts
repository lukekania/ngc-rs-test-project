import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-exports-conditions',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="Exports conditional resolution"
      groupLabel="Build & Platform"
      description="Resolve rxjs and @angular/core/rxjs-interop via package.json exports conditions."
      [issue]="64"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          RxJS declares a full <code>exports</code> map with <code>browser</code>,
          <code>import</code>, <code>default</code> conditions plus production/development entry
          points. Build with <code>--configuration production</code> vs <code>development</code>;
          the resolved <code>rxjs</code> entry file should differ.
        </p>
        <p>
          Also imports <code>@angular/core/rxjs-interop</code> — a nested subpath defined in
          <code>@angular/core</code>'s exports map. If <code>takeUntilDestroyed</code> works,
          nested conditional export resolution passed.
        </p>
      </ng-container>

      <p>A live tick verifies the resolved entry actually runs: tick = <strong>{{ tick() }}</strong></p>
    </app-feature-page>
  `,
})
export class ExportsConditionsComponent {
  private readonly destroyRef = inject(DestroyRef);
  readonly tick = signal(0);

  constructor() {
    interval(500)
      .pipe(map((n) => n + 1), take(20), takeUntilDestroyed(this.destroyRef))
      .subscribe((n) => this.tick.set(n));
  }
}
