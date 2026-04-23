import { Component } from '@angular/core';

@Component({
  selector: 'app-scss-styles',
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
    <h2>#61 SCSS / Less / Stylus component style preprocessing</h2>
    <p>
      Verifies: (a) component <code>styleUrl: ./*.scss</code> preprocessed;
      (b) inline <code>styles: [\`...\`]</code> preprocessed because
      <code>inlineStyleLanguage: scss</code> is set in angular.json;
      (c) SCSS features — <code>$variables</code>, nested selectors, <code>@mixin</code>,
      <code>darken()</code>, <code>&::after</code>.
    </p>

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
  `,
})
export class ScssStylesComponent {}
