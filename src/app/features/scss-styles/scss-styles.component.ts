import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-scss-styles',
  imports: [FeaturePageComponent],
  styleUrl: './scss-styles.component.scss',
  styles: [`
    @use 'sass:color';

    $inline-color: #2e7d32;

    .scss-inline {
      border-left: 4px solid $inline-color;
      padding: 0.5rem 0.75rem;
      margin-top: 0.75rem;
      background: color.adjust($inline-color, $lightness: 60%);

      strong {
        color: $inline-color;
      }
    }
  `],
  template: `
    <app-feature-page
      title="SCSS component styles"
      groupLabel="i18n & Styling"
      description="External .scss styleUrl plus SCSS-preprocessed inline styles via inlineStyleLanguage."
      [issue]="61"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          Verifies (a) component <code>styleUrl: ./*.scss</code> is preprocessed;
          (b) inline <code>styles: [\`...\`]</code> is preprocessed because
          <code>inlineStyleLanguage: scss</code> is set in angular.json;
          (c) SCSS features work — <code>$variables</code>, nested selectors,
          <code>color.adjust()</code>.
        </p>
      </ng-container>

      <div class="scss-card">
        <h3 class="title">Preprocessed external .scss</h3>
        <div class="chips">
          <span class="chip">accent</span>
          <span class="chip alt">alt</span>
        </div>
      </div>

      <div class="scss-inline">
        <strong>Preprocessed inline styles</strong> via <code>inlineStyleLanguage: scss</code>.
      </div>
    </app-feature-page>
  `,
})
export class ScssStylesComponent {}
