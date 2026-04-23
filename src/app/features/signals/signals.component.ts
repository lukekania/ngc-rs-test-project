import {
  Component,
  ElementRef,
  contentChild,
  contentChildren,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { BadgeComponent } from './badge.component';

@Component({
  selector: 'app-signals',
  imports: [BadgeComponent],
  template: `
    <h2>#55 Signal-based inputs / outputs / models / queries</h2>

    <p>Top badges exercise <code>input.required</code>, <code>input</code> with transform + alias, <code>model</code>, <code>output</code>.</p>

    <div class="row">
      <app-badge label="required" [count]="'3'" hint="transformed from string" />
      <app-badge label="two-way" [(active)]="parentActive" (dismissed)="onDismiss($event)" />
      <app-badge #b label="queried" />
    </div>

    <p>Last dismissed: <strong>{{ lastDismissed() || '—' }}</strong></p>
    <p>parentActive = {{ parentActive() }}</p>

    <h3>viewChild / viewChildren / contentChild / contentChildren</h3>
    <div #viewAnchor class="anchor">viewChild anchor</div>
    <div #plural class="anchor">plural #1</div>
    <div #plural class="anchor">plural #2</div>

    <p>viewChild text: <code>{{ anchorText() }}</code></p>
    <p>viewChildren count: <code>{{ pluralCount() }}</code></p>

    <ng-content />
    <p>contentChild present: <code>{{ projected() ? 'yes' : 'no' }}</code></p>
    <p>contentChildren count: <code>{{ allProjected().length }}</code></p>
  `,
  styles: [`
    .row { display:flex; gap:.5rem; flex-wrap:wrap; margin:.5rem 0; }
    .anchor { padding:.25rem .5rem; background:#f3f3f3; margin:.25rem 0; }
  `],
})
export class SignalsComponent {
  readonly parentActive = signal(false);
  readonly lastDismissed = signal('');

  readonly anchor = viewChild<ElementRef<HTMLDivElement>>('viewAnchor');
  readonly allAnchors = viewChildren<ElementRef<HTMLDivElement>>('plural');
  readonly projected = contentChild<ElementRef<HTMLElement>>('projected');
  readonly allProjected = contentChildren<ElementRef<HTMLElement>>('projected');

  onDismiss(label: string) {
    this.lastDismissed.set(label);
  }

  anchorText() {
    return this.anchor()?.nativeElement.textContent ?? '';
  }

  pluralCount() {
    return this.allAnchors().length;
  }
}
