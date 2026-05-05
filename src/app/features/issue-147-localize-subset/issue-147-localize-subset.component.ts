import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-147-localize-subset',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="localize subset"
      groupLabel="i18n & Styling"
      description="ng build --localize=en,de should emit only the requested locale subset, not all locales declared in i18n.locales."
      [issue]="147"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> CI builds often want one or two locales for a given deploy
          (preview, smoke check, single-locale rollout). The <code>--localize</code> flag should
          accept an array form (<code>--localize=en,de</code>) and filter
          <code>i18n.locales</code> to that subset.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> <code>localize: ['en', 'de']</code> is
          accepted but warns it's ignored, and the build emits all locales — wasted CI minutes.
        </p>
        <p>
          <strong>Why it matters:</strong> projects with 10+ locales pay 10× for any preview
          build that didn't need them.
        </p>
      </ng-container>

      <h3>angular.json + CLI</h3>
      <pre><code>"i18n": &#123;
  "sourceLocale": "en",
  "locales": &#123;
    "de": "src/locale/messages.de.xlf",
    "fr": "src/locale/messages.fr.xlf",
    "ja": "src/locale/messages.ja.xlf"
  &#125;
&#125;

# emit en + de only
ngc-rs build --localize=en,de</code></pre>

      <h3>Verification</h3>
      <ul>
        <li><code>--localize</code> (no value) keeps current "all locales" behavior.</li>
        <li><code>--localize=en,de</code> emits two locale subdirectories under <code>dist/</code> and skips the rest.</li>
        <li>Architect builder passes the array form straight through to the CLI.</li>
        <li>Drop the "ignored" warning once filtering works.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue147LocalizeSubsetComponent {}
