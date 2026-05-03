import { Component, signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-animations',
  imports: [FeaturePageComponent],
  animations: [
    trigger('fade', [
      state('shown', style({ opacity: 1, transform: 'translateX(0)' })),
      state('hidden', style({ opacity: 0, transform: 'translateX(-24px)' })),
      transition('shown <=> hidden', animate('300ms ease-out')),
    ]),
    trigger('slide', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('250ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ height: 0, opacity: 0 }))]),
    ]),
  ],
  template: `
    <app-feature-page
      title="Animation triggers"
      groupLabel="i18n & Styling"
      description="[@fade] property binding, animation event callbacks, :enter / :leave structural triggers."
      [issue]="59"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          Uses <code>[@fade]="state"</code> property binding, <code>(@fade.start)</code> and
          <code>(@fade.done)</code> listeners, plus the structural <code>:enter</code> /
          <code>:leave</code> transitions on a conditional <code>[@slide]</code> block.
        </p>
      </ng-container>

      <button (click)="toggle()">toggle</button>

      <div
        class="box"
        [@fade]="state()"
        (@fade.start)="onEvt('fade', 'start', $event)"
        (@fade.done)="onEvt('fade', 'done', $event)"
      >
        I fade via [@fade] property binding. state = {{ state() }}
      </div>

      @if (state() === 'shown') {
        <div class="box slide" [@slide]>
          I use :enter / :leave via the [@slide] trigger.
        </div>
      }

      <pre class="log">{{ log() }}</pre>
    </app-feature-page>
  `,
  styles: [`
    .box { padding:.75rem; margin:.5rem 0; background:#ffe0b2; border:1px solid #ef6c00; }
    .slide { background:#b3e5fc; border-color:#0277bd; overflow:hidden; }
    .log { background:#111; color:#0f0; padding:.5rem; min-height:4rem; font-size:.8rem; }
  `],
})
export class AnimationsComponent {
  readonly state = signal<'shown' | 'hidden'>('shown');
  readonly log = signal('');

  toggle() {
    this.state.update((s) => (s === 'shown' ? 'hidden' : 'shown'));
  }

  onEvt(trigger: string, phase: string, ev: { fromState: string; toState: string }) {
    const line = `${trigger}.${phase}: ${ev.fromState} -> ${ev.toState}`;
    this.log.update((prev) => `${prev}${line}\n`);
  }
}
