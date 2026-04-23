import { Component, ChangeDetectionStrategy, input, output, model } from '@angular/core';

@Component({
  selector: 'app-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge" (click)="dismissed.emit(label())">
      <strong>{{ label() }}</strong>
      <em>x{{ count() }}</em>
      @if (note()) {
        <small>({{ note() }})</small>
      }
      <button type="button" (click)="toggle()">{{ active() ? 'on' : 'off' }}</button>
    </span>
  `,
  styles: [`
    .badge { display:inline-flex; gap:.5rem; padding:.25rem .5rem; border:1px solid #888; border-radius:4px; }
    button { font: inherit; }
  `],
})
export class BadgeComponent {
  readonly label = input.required<string>();
  readonly count = input(0, { transform: (v: number | string) => Number(v) });
  readonly note = input<string | undefined>(undefined, { alias: 'hint' });
  readonly active = model(false);
  readonly dismissed = output<string>();

  toggle() {
    this.active.update((v) => !v);
  }
}
