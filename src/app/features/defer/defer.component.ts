import { Component, signal } from '@angular/core';
import { HeavyComponent } from './heavy.component';

@Component({
  selector: 'app-defer',
  imports: [HeavyComponent],
  template: `
    <h2>#56 &#64;defer blocks — every trigger + sub-blocks</h2>

    <section>
      <h3>on idle (default) with &#64;placeholder / &#64;loading / &#64;error</h3>
      @defer {
        <app-heavy />
      } @placeholder (minimum 200ms) {
        <p class="ph">placeholder: waiting for idle…</p>
      } @loading (after 100ms; minimum 200ms) {
        <p class="ld">loading…</p>
      } @error {
        <p class="er">failed to load</p>
      }
    </section>

    <section>
      <h3>on viewport — scroll the component into view</h3>
      <div style="height:60vh"></div>
      @defer (on viewport) {
        <app-heavy />
      } @placeholder {
        <p class="ph">scroll down to trigger viewport…</p>
      }
    </section>

    <section>
      <h3>on hover</h3>
      @defer (on hover(trigger)) {
        <app-heavy />
      } @placeholder {
        <p class="ph" #trigger>hover me to load</p>
      }
    </section>

    <section>
      <h3>on interaction</h3>
      @defer (on interaction(clicker)) {
        <app-heavy />
      } @placeholder {
        <button #clicker>click me to load</button>
      }
    </section>

    <section>
      <h3>on timer(1500ms)</h3>
      @defer (on timer(1500ms)) {
        <app-heavy />
      } @placeholder {
        <p class="ph">loads after 1.5s…</p>
      }
    </section>

    <section>
      <h3>on immediate</h3>
      @defer (on immediate) {
        <app-heavy />
      }
    </section>

    <section>
      <h3>when &lt;expr&gt;</h3>
      <button (click)="ready.set(true)">flip condition ({{ ready() ? 'true' : 'false' }})</button>
      @defer (when ready()) {
        <app-heavy />
      } @placeholder {
        <p class="ph">waiting for ready()==true…</p>
      }
    </section>

    <section>
      <h3>prefetch on idle + on interaction</h3>
      @defer (on interaction(prefetchClick); prefetch on idle) {
        <app-heavy />
      } @placeholder {
        <button #prefetchClick>click (already prefetched)</button>
      }
    </section>
  `,
  styles: [`
    section { margin: 1.5rem 0; padding: 1rem; border:1px solid #ddd; border-radius:4px; }
    .ph { color:#666; font-style:italic; }
    .ld { color:#1976d2; }
    .er { color:#c62828; }
  `],
})
export class DeferComponent {
  readonly ready = signal(false);
}
