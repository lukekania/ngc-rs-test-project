import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-service-worker',
  template: `
    <h2>#65 Angular service worker — ngsw-config.json &rarr; ngsw.json</h2>
    <p><code>angular.json</code> has <code>"serviceWorker": "ngsw-config.json"</code>.
       A production build should emit <code>dist/.../ngsw.json</code> with hashed assets
       and copy <code>ngsw-worker.js</code> next to the app.</p>
    <p>After <code>ng build</code>:</p>
    <ul>
      <li><code>ls dist/test-ng-project/browser/ngsw.json ngsw-worker.js</code> — both must exist</li>
      <li>Every file path in <code>assetGroups</code> appears in <code>ngsw.json.hashTable</code></li>
    </ul>

    <p>At runtime, <code>SwUpdate</code> is injected here:</p>
    <ul>
      <li>isEnabled: <code>{{ isEnabled }}</code></li>
      <li>version events received: <code>{{ events() }}</code></li>
    </ul>

    <button (click)="check()" [disabled]="!isEnabled">check for update</button>
  `,
})
export class ServiceWorkerComponent {
  private readonly sw = inject(SwUpdate);
  private readonly destroyRef = inject(DestroyRef);
  readonly isEnabled = this.sw.isEnabled;
  readonly events = signal(0);

  constructor() {
    this.sw.versionUpdates
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.events.update((n) => n + 1));
  }

  check() {
    void this.sw.checkForUpdate();
  }
}
