import { Component, signal } from '@angular/core';
import { RippleDirective } from './ripple.directive';
import { TooltipDirective } from './tooltip.directive';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-host-directives',
  imports: [FeaturePageComponent],
  hostDirectives: [
    RippleDirective,
    {
      directive: TooltipDirective,
      inputs: ['appTooltipText: tooltipText'],
      outputs: [],
    },
  ],
  template: `
    <app-feature-page
      title="hostDirectives composition"
      groupLabel="Components & Templates"
      description="Compose Ripple and Tooltip directives onto a component's host element."
      [issue]="57"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <code>RippleDirective</code> is applied bare; <code>TooltipDirective</code> uses the mapped
          form with input remapping (<code>appTooltipText</code> → <code>tooltipText</code>). No
          <code>NgModule</code> required.
        </p>
        <p>
          Click anywhere on the page — a <code>.is-rippled</code> class flashes on the host element.
          Hover the host to see the <code>title</code> attribute the tooltip directive applies.
        </p>
      </ng-container>

      <button (click)="ripples.update((n) => n + 1)">bump counter: {{ ripples() }}</button>
    </app-feature-page>
  `,
  host: {
    '[attr.data-tooltip-host]': 'true',
    tooltipText: 'tooltip set via hostDirectives input remapping',
  },
  styles: [`
    :host { display:block; padding:1rem; border:1px solid #888; }
    :host(.is-rippled) { background: #fff59d; transition: background 100ms; }
  `],
})
export class HostDirectivesComponent {
  readonly ripples = signal(0);
}
