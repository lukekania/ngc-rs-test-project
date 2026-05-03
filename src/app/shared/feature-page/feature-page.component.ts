import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-feature-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="feature-page">
      @if (groupLabel()) {
        <span class="eyebrow">{{ groupLabel() }}</span>
      }
      <h1>{{ title() }}</h1>
      @if (description()) {
        <p class="lede">{{ description() }}</p>
      }
      <details class="notes" [open]="notesOpen()">
        <summary>What this shows</summary>
        <ng-content select="[notes]" />
      </details>
      <section class="demo">
        <ng-content />
      </section>
      <ng-content select="[aside]" />
      @if (issue() !== null) {
        <footer class="issue-badge">
          <a
            [href]="'https://github.com/angular/angular/issues/' + issue()"
            target="_blank"
            rel="noopener"
            >ngc-rs #{{ issue() }}</a
          >
        </footer>
      }
    </article>
  `,
  styles: [
    `
      .feature-page {
        max-width: 64rem;
        margin: 0 auto;
        padding: 1.5rem 1rem 3rem;
      }
      .eyebrow {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #607d8b;
        margin-bottom: 0.25rem;
      }
      h1 {
        margin: 0 0 0.5rem;
        font-size: 1.75rem;
      }
      .lede {
        color: #455a64;
        margin: 0 0 1rem;
      }
      .notes {
        background: #eceff1;
        border-radius: 6px;
        padding: 0.5rem 0.75rem;
        margin: 0 0 1.5rem;
      }
      .notes summary {
        cursor: pointer;
        font-weight: 600;
        color: #37474f;
      }
      .notes[open] summary {
        margin-bottom: 0.5rem;
      }
      .demo {
        display: block;
      }
      .issue-badge {
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid #cfd8dc;
        font-size: 0.85rem;
        color: #78909c;
      }
      .issue-badge a {
        color: inherit;
        text-decoration: none;
      }
      .issue-badge a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class FeaturePageComponent {
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly groupLabel = input<string>('');
  readonly issue = input<number | null>(null);
  readonly notesOpen = input<boolean>(false);
}
