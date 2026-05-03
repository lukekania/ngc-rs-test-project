import { Component, computed, signal } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-i18n',
  imports: [FeaturePageComponent],
  templateUrl: './i18n.component.html',
})
export class I18nComponent {
  readonly count = signal(0);
  readonly status = signal<'pending' | 'shipped' | 'delivered'>('pending');

  readonly greeting = computed(() =>
    $localize`:@@runtime.greeting:Hello from $localize — count is ${this.count()}:count:`,
  );

  inc() { this.count.update((n) => n + 1); }
  dec() { this.count.update((n) => Math.max(0, n - 1)); }
  cycleStatus() {
    this.status.update((s) => (s === 'pending' ? 'shipped' : s === 'shipped' ? 'delivered' : 'pending'));
  }
}
