import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-web-worker',
  imports: [FormsModule, FeaturePageComponent],
  template: `
    <app-feature-page
      title="Web worker"
      groupLabel="HTTP & Async"
      description="Off-thread work via new Worker(new URL(..., import.meta.url))."
      [issue]="66"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          The bundler must treat the worker module as a separate entrypoint and rewrite
          <code>new URL('./hash.worker', import.meta.url)</code> to the emitted chunk filename.
          The worker hashes the input string and posts the result back.
        </p>
      </ng-container>

      <label>input: <input [(ngModel)]="input" /></label>
      <button (click)="send()" [disabled]="!supported()">hash via worker</button>
      <p>worker supported: {{ supported() ? 'yes' : 'no' }}</p>
      <p>last hash: <code>{{ result() || '—' }}</code></p>
    </app-feature-page>
  `,
})
export class WebWorkerComponent {
  input = 'ngc-rs';
  readonly result = signal('');
  readonly supported = signal(typeof Worker !== 'undefined');
  private readonly destroyRef = inject(DestroyRef);
  private worker: Worker | null = null;

  constructor() {
    if (this.supported()) {
      this.worker = new Worker(new URL('./hash.worker', import.meta.url), { type: 'module' });
      this.worker.addEventListener('message', (ev: MessageEvent<{ input: string; hash: string }>) => {
        this.result.set(`${ev.data.input} → ${ev.data.hash}`);
      });
      this.destroyRef.onDestroy(() => this.worker?.terminate());
    }
  }

  send() {
    this.worker?.postMessage(this.input);
  }
}
