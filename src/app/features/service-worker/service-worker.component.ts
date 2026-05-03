import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwUpdate } from '@angular/service-worker';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-service-worker',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="Service worker"
      groupLabel="Build & Platform"
      description="ngsw-config.json compiled to ngsw.json and consumed via SwUpdate at runtime."
      [issue]="65"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <code>angular.json</code> has <code>"serviceWorker": "ngsw-config.json"</code>. A production
          build emits <code>dist/.../ngsw.json</code> with hashed assets and copies
          <code>ngsw-worker.js</code> next to the app. <code>SwUpdate</code> is injected here for
          version-update notifications.
        </p>
      </ng-container>

      <ul>
        <li>isEnabled: <code>{{ isEnabled }}</code></li>
        <li>version events received: <code>{{ events() }}</code></li>
      </ul>

      <button (click)="check()" [disabled]="!isEnabled">check for update</button>
    </app-feature-page>
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
