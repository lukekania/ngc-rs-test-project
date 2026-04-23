import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-exports-conditions',
  template: `
    <h2>#64 exports conditional resolution (browser / import / production)</h2>
    <p>
      This component imports <code>rxjs</code> and <code>rxjs/operators</code>.
      RxJS declares a full <code>exports</code> map with
      <code>browser</code>, <code>import</code>, <code>default</code> conditions and different
      entry points for <code>development</code> / <code>production</code> in newer versions.
    </p>
    <p>
      Build with <code>--configuration production</code> and
      <code>--configuration development</code>; the resolved <code>rxjs</code> entry file
      should differ. Check the bundle with <code>grep -c "rxjs dev build"</code> etc.
    </p>
    <p>
      A live tick verifies the resolved entry actually runs:
      tick = <strong>{{ tick() }}</strong>
    </p>

    <p>Also imports <code>@angular/core/rxjs-interop</code> — a nested subpath
       (<code>./rxjs-interop</code>) defined in <code>@angular/core</code>'s exports map.
       If <code>takeUntilDestroyed</code> works, nested conditional export resolution passed.</p>
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
