import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-web-worker',
  imports: [FormsModule],
  template: `
    <h2>#66 Web worker bundling (new Worker + new URL + import.meta.url)</h2>
    <p>
      <code>new Worker(new URL('./hash.worker', import.meta.url), &#123; type: 'module' &#125;)</code>
      — the bundler must treat the worker as a separate entrypoint and rewrite the URL to
      the emitted chunk filename.
    </p>

    <label>input: <input [(ngModel)]="input" /></label>
    <button (click)="send()" [disabled]="!supported()">hash via worker</button>
    <p>worker supported: {{ supported() ? 'yes' : 'no' }}</p>
    <p>last hash: <code>{{ result() || '—' }}</code></p>
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
