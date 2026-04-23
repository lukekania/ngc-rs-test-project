import { Component } from '@angular/core';

@Component({
  selector: 'app-heavy',
  template: `
    <div class="heavy">
      <strong>HeavyComponent</strong> — lazy chunk. Random seed: {{ seed }}
    </div>
  `,
  styles: [`
    .heavy { padding:.5rem; background:#e0f7fa; border:1px dashed #00796b; }
  `],
})
export class HeavyComponent {
  readonly seed = Math.floor(Math.random() * 1_000_000);
}
