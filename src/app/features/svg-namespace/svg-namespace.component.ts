import { Component, signal } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-svg-namespace',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="SVG & MathML namespaces"
      groupLabel="Components & Templates"
      description="Inline SVG with @for, foreignObject namespace reset, and MathML rendering."
      [issue]="60"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          If the SVG chart renders with visible shapes, the SVG namespace push/pop is correct. If
          it's blank, elements are being created in the HTML namespace.
          <code>&lt;foreignObject&gt;</code> demonstrates returning to the HTML namespace inside SVG.
        </p>
      </ng-container>

      <svg viewBox="0 0 200 80" width="300" height="120" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #888;">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#42a5f5" />
          <stop offset="100%" stop-color="#7e57c2" />
        </linearGradient>
      </defs>
      <g transform="translate(10,10)">
        @for (bar of bars(); track $index) {
          <rect [attr.x]="$index * 20" y="0" width="16" [attr.height]="bar" fill="url(#grad)" />
        }
      </g>
      <circle [attr.cx]="50" cy="60" r="6" fill="#e53935" (click)="bump()" style="cursor:pointer;" />
      <text x="10" y="75" font-size="10" fill="#333">click red dot — bars = {{ sum() }}</text>

      <foreignObject x="100" y="30" width="90" height="40">
        <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff; border:1px solid #444; padding:2px; font-size:10px;">
          foreignObject &rarr; HTML div (namespace returns to HTML inside)
        </div>
      </foreignObject>
    </svg>

      <h3>MathML</h3>
      <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
        <mrow>
          <msup><mi>a</mi><mn>2</mn></msup>
          <mo>+</mo>
          <msup><mi>b</mi><mn>2</mn></msup>
          <mo>=</mo>
          <msup><mi>c</mi><mn>2</mn></msup>
        </mrow>
      </math>
    </app-feature-page>
  `,
})
export class SvgNamespaceComponent {
  readonly bars = signal([30, 45, 20, 55, 35, 60, 25]);

  bump() {
    this.bars.update((arr) => arr.map((v) => Math.max(5, (v + 7) % 65)));
  }

  sum() {
    return this.bars().reduce((a, b) => a + b, 0);
  }
}
