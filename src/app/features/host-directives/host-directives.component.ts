import { Component, signal } from '@angular/core';
import { RippleDirective } from './ripple.directive';
import { TooltipDirective } from './tooltip.directive';

@Component({
  selector: 'app-host-directives',
  hostDirectives: [
    RippleDirective,
    {
      directive: TooltipDirective,
      inputs: ['appTooltipText: tooltipText'],
      outputs: [],
    },
  ],
  template: `
    <h2>#57 hostDirectives composition</h2>
    <p>
      This component has <code>RippleDirective</code> (bare form) and
      <code>TooltipDirective</code> (mapped form with input remapping) composed onto its host.
    </p>
    <p>Click the host (this page's root element) — a <code>.is-rippled</code> class flashes on.</p>
    <p>Hover the host — a <code>title</code> attribute set by the tooltip directive becomes visible.</p>

    <button (click)="ripples.update((n) => n + 1)">bump counter: {{ ripples() }}</button>
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
